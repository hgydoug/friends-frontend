<script setup lang="ts">
import { ref } from 'vue';
import { showToast } from 'vant';

const value = ref('');
const onSearch = (val) => showToast(val); // 按下回车就会显示
const onCancel = () => showToast('取消');

const show = ref(true);
const close = (tag) => {
    // show.value = false;
    console.log(tag)
    // 从selectTag中移除
    selectTag.value = selectTag.value.filter(sTag => sTag.id !== tag.id );

    activeIds.value = activeIds.value.filter(id => id != tag.id);
    
    // 添加到tagList
    // tagList.value
    originTagList.forEach(oTag => {
        // console.log(oTag.children)
        const children =  oTag.children.filter(ch => ch.id === tag.id);
        if (!children) {
            return
        }
        tagList.value = tagList.value.map(tt => {
            if (tt.text === oTag.text ) {
                return {
                    text: tt.text,
                    children:  tt.children.concat(children).sort((pre, next) => pre.id - next.id)
                }
            }
            return tt;
        })
    } )
    

    tagList.value = tagList.value.concat()
};

const activeIds = ref([]);
const activeIndex = ref(0);
const selectTag = ref([]);
const originTagList = [
    {
        text: '性别',
        children: [
            { text: '男', id: 1 },
            { text: '女', id: 2 },
        ],
    },
    {
        text: '年级',
        children: [
            { text: '大一', id: 3 },
            { text: '大二', id: 4 },
            { text: '大三', id: 5 },
            { text: '大四', id: 6 },
        ],
    },
];

const tagList = ref(originTagList)


const clickItem = (item: any) => {
    // console.log(item.id)

    selectTag.value = selectTag.value.concat(tagList.value.flatMap(tag => tag.children)
        .filter(ch =>{
            return item.id === ch.id;
        }))

    // 从tagList中移除
    tagList.value = tagList.value.map(tag => {
        const children =  tag.children.filter(ch => ch.id != item.id);
        return {
            text: tag.text,
            children: children,
        }
    })
   
};

</script>

<template>
    <form action="/">
        <van-search v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" />
    </form>
    <van-divider content-position="left">已选标签</van-divider>
    <van-tag v-for="tag in  selectTag"  type="primary" closeable @close="close(tag)">
      {{tag.text}}
    </van-tag>

    <van-divider content-position="left">标签</van-divider>
    <van-tree-select v-model:active-id="activeIds"  v-model:main-active-index="activeIndex" :items="tagList"  @click-item="clickItem" />

</template>

<style scoped></style>