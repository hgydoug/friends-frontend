<template>
  <!-- loading: 是这个组件的一个属性 -->
    <user-card-list :user-list="userList" :loading="loading"/>
    <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空" />
 </template>
  

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRoute} from "vue-router";
import myAxios from "../plugins/myAxios";
// import {Toast} from "vant";
// showSuccessToast
import {  showFailToast } from 'vant';
import qs from 'qs';
import UserCardList from "../components/UserCardList.vue";
import { UserType } from '../models/user';

const route = useRoute(); // 获取路由参数信息
const {tags} = route.query;

const loading = ref(true)

const userList = ref<UserType[]>([]);

onMounted(async () => {
    // await: 同步等待结果
    // Promise() : 异步等待结果
    const userListData :UserType[] = await myAxios.get('/user/search/tags', {
        params: {
            tagNameList: tags
        },
        paramsSerializer: params => {
            return qs.stringify(params, {indices: false})
         }
    })
    .then(function (response) {
        console.log('/user/search/tags succeed', response);
        return response?.data;
      })
    .catch(function (error) {
        console.error('/user/search/tags error', error);
        showFailToast('请求失败');
    })
    console.log(userListData)
    if (userListData) {
        userListData.forEach(user => {
        if (user.tags) {
            user.tags = JSON.parse(user.tags);
        }
        })
        userList.value = userListData;
        loading.value = false;
        console.log('uuu',userList)
    }

    // userList.value = [mockUser];

})

// const mockUser = {
//   id: 12345,
//   username: '鱼皮',
//   userAccount: '12314',
//   profile: '一名精神小伙，目前还有头发，谢谢大家，阿爸爸阿爸爸阿巴阿巴阿巴',
//   avatarUrl: 'https://636f-codenav-8grj8px727565176-1256524210.tcb.qcloud.la/img/logo.png',
//   gender: 0,
//   phone: '13113113111',
//   email: '592342843721987@xzcxzczxcz.com',
//   userRole: 0,
//   planetCode: '1234',
//   tags: ['java', 'emo', '打工中', 'emo', '打工中'],
//   createTime: new Date(),
// }



</script>