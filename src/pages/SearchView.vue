<script setup lang="ts">
import { ref } from 'vue';
import {useRouter} from "vue-router";


const router = useRouter()
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

const onSearch = (val: string) => {
    // val: 对应文本框的值
    console.log(val);
    tagList.value = originTagList.map(parentTag => {
    const tempChildren = [...parentTag.children];
    const tempParentTag = {...parentTag};
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));  // 页面使用才不需要加value
    return tempParentTag;
  });


} // 按下回车就会显示
const onCancel = () => {
    searchText.value = '';
   tagList.value = originTagList;
}

// 关闭已选择的标签
const doClose = (tagId: string) => {
    activeIds.value = activeIds.value.filter(item =>  item !== tagId);
};


/**
 * 执行搜索   ====> 跳转到路由搜索页
 */
 const doSearchResult = () => {
  router.push({
    path: '/user/list',
    query: {
      tags: activeIds.value
    }
  })
}


</script>

<template>
    <form action="/">
        <van-search 
            v-model="searchText" 
            show-action 
            placeholder="请输入搜索关键词" 
            @search="onSearch" 
            @cancel="onCancel" />
    </form>
    <van-divider content-position="left">已选标签</van-divider>
    <div v-if="activeIds.length === 0">请选择标签</div>
    <van-row gutter="16" style="padding: 0 16px;">
        <van-col v-for="tagId in activeIds">
            <van-tag  type="primary" closeable @close="doClose(tagId)">
                {{tagId}}
            </van-tag>
        </van-col>
    </van-row>
    

    <van-divider content-position="left">选择标签</van-divider>
    <!-- @click-item="clickItem" -->
    <van-tree-select v-model:active-id="activeIds"  v-model:main-active-index="activeIndex" :items="tagList"   />
    <div style="padding: 12px;">
        <van-button block type="primary" @click="doSearchResult">搜索</van-button>
    </div>

</template>

<style scoped></style>