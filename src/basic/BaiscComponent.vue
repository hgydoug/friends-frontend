<template>
    <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <template #right>
            <van-icon name="search" size="18" />
        </template>
    </van-nav-bar>

    <div id="content">
        <RouterView />
    </div>

    <van-tabbar v-model="active" @change="onChange" route>
        <van-tabbar-item icon="home-o" name="index"  to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="search" name="team"  to="/team">队伍</van-tabbar-item>
        <van-tabbar-item icon="friends-o" name="user"  to="/user">个人</van-tabbar-item>
    </van-tabbar>

</template>

<!-- setup，相当于编写setup函数 export default {setup} -->
<script setup lang="ts">
import { ref } from 'vue';
import { showToast } from 'vant';
import { useRoute, useRouter } from 'vue-router'

const router = useRouter();

const onClickLeft = () => showToast('left');

const onClickRight = () => {
    // 编程式路由
    router.push('/search')
};
const active = ref("index");
const onChange = (index: string) => showToast(`标签 ${index}`);


</script>

<style scoped></style>