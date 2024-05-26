<script setup lang="ts">
import { ref } from 'vue';
import { showToast } from 'vant';

const searchText = ref('');
const activeIds = ref([]);
const activeIndex = ref(0);
const originTagList = [
    {
        text: '性别',
        children: [
            { text: '男', id:  '男'},
            { text: '女', id:  '女' },
        ],
    },
    {
        text: '年级',
        children: [
            { text: '大一', id:  '大一' },
            { text: '大二', id:  '大二' },
            { text: '大三', id:  '大三' },
            { text: '大四', id:  '大四' },
        ],
    },
];

const tagList = ref(originTagList)

const onSearch = (val: any) => {
    tagList.value = originTagList.map(parentTag => {
    const tempChildren = [...parentTag.children];
    const tempParentTag = {...parentTag};
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));  // 页面使用才不需要加value
    return tempParentTag;
  });


} // 按下回车就会显示
const onCancel = () => showToast('取消');

// 关闭已选择的标签
const doClose = (tagId: string) => {
    activeIds.value = activeIds.value.filter(item =>  item !== tagId);
};

</script>

<template>
    <form action="/">
        <van-search v-model="searchText" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" />
    </form>
    <van-divider content-position="left">已选标签</van-divider>
    <van-tag v-for="tagId in  activeIds"  type="primary" closeable @close="doClose(tagId)">
      {{tagId}}
    </van-tag>

    <van-divider content-position="left">标签</van-divider>
    <!-- @click-item="clickItem" -->
    <van-tree-select v-model:active-id="activeIds"  v-model:main-active-index="activeIndex" :items="tagList"   />

</template>

<style scoped></style>