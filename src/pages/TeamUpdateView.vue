<template>
    <div id="teamAddPage">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
        <van-field
              v-model="addTeamData.name"
              name="name"
              label="队伍名"
              placeholder="请输入队伍名"
              :rules="[{ required: true, message: '请输入队伍名' }]"
          />
          <van-field
              v-model="addTeamData.description"
              rows="4"
              autosize
              label="队伍描述"
              type="textarea"
              placeholder="请输入队伍描述"
          />
          <van-field
              v-model="addTeamData.expireTime"
              is-link
              readonly
              name="datetimePicker"
              label="过期时间"
              :placeholder="addTeamData.expireTime ?? '点击选择过期时间'"
              @click="showPicker = true"
          />
            <van-popup v-model:show="showPicker" position="bottom">
            <van-date-picker
                @confirm="onConfirm"
                type="datetime"
                title="请选择过期时间"
            />
          </van-popup>
          <van-field name="radio" label="队伍状态">
            <template #input>
              <van-radio-group v-model="addTeamData.status" direction="horizontal">
                <van-radio name="0">公开</van-radio>
                <van-radio name="1">私有</van-radio>
                <van-radio name="2">加密</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field
              v-if="Number(addTeamData.status) === 2"
              v-model="addTeamData.password"
              type="password"
              name="password"
              label="密码"
              placeholder="请输入队伍密码"
              :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </template>
  
  <script setup lang="ts">
  
  import {useRoute, useRouter} from "vue-router";
  import {onMounted, ref, computed} from "vue";
  import myAxios from "../plugins/myAxios";
  // import {Toast} from "vant";
  import { showSuccessToast, showFailToast } from 'vant';
  import {formateTime, getYearMonthDay} from '../utils/dateutils';
import { TeamType } from "../models/team";
import { Result } from "../models/result";
import { TeamFormType } from "../models/team.form";


  
  const router = useRouter();
  const route = useRoute();
  
  // 展示日期选择器
  const showPicker = ref(false);
  
  const minDate = new Date();
  
  const id = route.query.id;
  
  // 需要用户填写的表单数据
  const addTeamData = ref<TeamFormType>({} as TeamFormType)
  
  // 获取之前的队伍信息
  onMounted(async () => {
    console.log('update id: ', id)
    if (!id) { // id < 0
      showFailToast('加载队伍失败');
      return;
    }
    const res: Result = await myAxios.get("/team/get", {
      params: {
        id,
      }
    });
    console.log('res:', res)
    if (res?.code === 0) {
      // const team = res.data as TeamType;
      addTeamData.value = res.data;
      if (addTeamData.value) {
            addTeamData.value.expireTime = getYearMonthDay(res.data.expireTime).join('/');
            addTeamData.value.status = res.data.status.toString();
      }
     
      console.log('update: ', addTeamData.value)
    } else {
      showFailToast('加载队伍失败，请刷新重试');
    }}
  )

  // const expireTimeStr = computed(() => {
  //     const date = addTeamData.value?.expireTime;
  //     console.log('expireTimeStr: ', date)
  //     return formateTime(date, 'YYYY-MM-DD'); // 根据本地时间格式化
  //   });
  
  //   const expireTimePickStr = computed(() => {
  //     const date = addTeamData.value?.expireTime;
  //     console.log('expireTimePickStr: ', date)
  //     return getYearMonthDay(date); // 根据本地时间格式化
  //   });

    // const statusStr = computed(() => {
    //    const status = addTeamData.value.status;
    //    return status?.toString()
    // })

  // 提交
  const onSubmit = async () => {
    const postData = {
      ...addTeamData.value,
      status: Number(addTeamData.value?.status)
    }
    // todo 前端参数校验
    const res: Result = await myAxios.post("/team/update", postData);
    if (res?.code === 0 && res.data){
      showSuccessToast('更新成功');
      router.push({
        path: '/team',
        replace: true,
      });
    } else {
      showFailToast('更新失败');
    }
  }

  const onConfirm = ( selectedValues: any ) => {
        console.log('selectedValues: ', selectedValues);
      const expireTime =  selectedValues.selectedValues.join('/');
      // console.log('addTeamData')
      addTeamData.value.expireTime = expireTime;
      // selectDate.value = selectedValues.selectedValues;
      showPicker.value = false;
    };

  </script>
  
  <style scoped>
  #teamPage {
  
  }
  </style>
  