<template>
  <template v-if="user">
    <van-cell title="当前用户" :value="user.username" />
    <van-cell title="修改信息" is-link  to="/user/update" />
    <van-cell title="我创建的队伍" is-link  to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link  to="/user/team/join" />
  </template>
</template>



<script setup lang="ts">
import { onMounted, ref } from 'vue';
// import { useRouter } from 'vue-router';
import { UserType } from '../models/user';
import {getCurrentUser} from '../service/user'


// const defaultUser = {
//   id: 1,
//   username: '鱼皮',
//   userAccount: 'dogYupi',
//   avatarUrl: 'https://636f-codenav-8grj8px727565176-1256524210.tcb.qcloud.la/img/logo.png',
//   gender: '男',
//   phone: '123112312',
//   email: '12345@qq.com',
//   planetCode: '1234',
//   createTime: new Date(),
// }



const user = ref<UserType>();

// const router = useRouter();

onMounted(async () => {
    user.value = await getCurrentUser();
})

// const toEdit = (editKey: string, editName: string, currentValue: string) => {
//     console.log('==',editKey, editName , currentValue)
//     router.push({
//         path: '/user/edit',
//         query: {
//             editKey,
//             editName,
//             currentValue,
//         }
//     })
// }

</script>

<style scoped>
</style>