<template>
    <van-form @submit="onSubmit">
        <van-field
            v-model="editUser.currentValue"
            :placeholder="`请输入${editUser.editName}`"
        />
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </template>
  
  <script setup lang="ts">
  import {useRoute, useRouter} from "vue-router";
  import { ref } from "vue";
  import myAxios from "../plugins/myAxios";
  import { showSuccessToast, showFailToast } from 'vant';
  import { Result } from "../models/result";
import { UserType } from "../models/user";
  import {getCurrentUser} from "../service/user";
  
  const route = useRoute();
  const router = useRouter();
  
  const editUser = ref({
    editKey: route.query.editKey,
    currentValue: route.query.currentValue,
    editName: route.query.editName,
  })
  
  // async
  const onSubmit =  async () => {
    console.log('xxx')
    // Toast.success('修改成功');
    const currentUser: UserType = await getCurrentUser();
  
    if (!currentUser) {
      // Toast.fail('用户未登录');
      showFailToast('用户未登录');
      return;
    }
  
    console.log(currentUser, '当前用户')
  
    const res :Result = await myAxios.post('/user/update', {
      'id': currentUser.id,
      [editUser.value.editKey as string]: editUser.value.currentValue,
    })
    console.log(res, '更新请求');
    if (res.code === 0 && res.data > 0) {
      // Toast.success('修改成功');
      showSuccessToast('修改成功')
      router.back();
    } else {
      // Toast.fail('');
      showFailToast('修改错误');
    }
  };
  
  </script>
  
  <style scoped>
  
  </style>
  