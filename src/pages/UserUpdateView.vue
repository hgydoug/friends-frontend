<template>
    <template v-if="user">
      <van-cell title="昵称" is-link to="/user/edit" :value="user.username"  @click="toEdit('username', '昵称', user.username)"/>
      <van-cell title="账号" :value="user.userAccount"/>
      <van-cell title="头像" is-link to="/user/edit">
        <img style="height: 48px" :src="user.avatarUrl"/>
      </van-cell>
      <van-cell title="性别" is-link :value="user.gender" @click="toEdit('gender', '性别', user.gender.toString())"/>
      <van-cell title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone', '电话', user.phone)"/>
      <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('email', '邮箱', user.email)"/>
      <van-cell title="星球编号" :value="user.planetCode"/>
      <van-cell title="注册时间" :value="formateTime(user.createTime,'YYYY-MM-DD HH:mm:ss')"/>
    </template>
  </template>
  
  <script setup lang="ts">
  import {useRouter} from "vue-router"
  import {onMounted,ref} from "vue"
  // import myAxios from "../plugins/myAxios";
  // import {Toast} from "vant";
  import {getCurrentUser} from "../service/user";
import { UserType } from "../models/user";
  import {formateTime} from '../utils/dateutils'
  
  // const defaultUser = {
  //   id: 1,
  //   username: '鱼皮',
  //   userAccount: 'dogYupi',
  //   avatarUrl: 'https://636f-codenav-8grj8px727565176-1256524210.tcb.qcloud.la/img/logo.png',
  //   gender: '男',
  //   phone: '123112312',
  //   email: '12345@qq.com',
  //   planetCode: '1234',
  //   createTime: new Date().toDateString(),
  // }
  
  const user = ref<UserType>();
  
  onMounted(async () => {
    user.value = await getCurrentUser();
  })
  
  const router = useRouter();
  
  const toEdit = (editKey: string, editName: string, currentValue: string) => {
    console.log(editKey, editName, currentValue);
    router.push({
      path: '/user/edit',
      query: {
        editKey,
        editName,
        currentValue,
      }
    })
  };
  </script>
  
  <style scoped>
  
  </style>
  