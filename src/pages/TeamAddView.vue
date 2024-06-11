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
          <!-- <van-field
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
                v-model="addTeamData.expireTime"
                @confirm="onConfirm"
                @cancel="showPicker = false" 
                type="datetime"
                title="请选择过期时间"
                :min-date="minDate"
            />
          </van-popup> -->

          <van-field
              v-model="addTeamData.expireTime"
              is-link
              readonly
              name="datePicker"
              label="时间选择"
              :placeholder="addTeamData.expireTime ?? '点击选择过期时间'"
              @click="showPicker = true"
          />  
          <van-popup v-model:show="showPicker" position="bottom">
            <van-date-picker @confirm="onConfirm" @cancel="showPicker = false"  v-model="selectDate" />
          </van-popup>

          <van-field name="stepper" label="最大人数">
            <template #input>
              <van-stepper v-model="addTeamData.maxNum" max="10" min="3"/>
            </template>
          </van-field>
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
  
  import {useRouter} from "vue-router";
  import {ref, computed} from "vue";
  import myAxios from "../plugins/myAxios";
  // import {Toast} from "vant";
  import { showSuccessToast, showFailToast } from 'vant';
  import {formateTime, getYearMonthDay} from '../utils/dateutils'
  import { TeamType } from "../models/team";
  import { Result } from "../models/result";
import { TeamFormType } from "../models/team.form";

  
  const router = useRouter();
  // 展示日期选择器
  const showPicker = ref(false);
  

  const curDate = getYearMonthDay(new Date());
  const curDateStr = curDate.join('/');

  const initFormData : TeamFormType = {
    expireTime:  curDateStr,
    maxNum: 3,
    status: "0",
  }
console.log('lll',curDate);
  const selectDate = ref<string[]>([...curDate]);
  
  // const minDate = new Date();
  
  // 需要用户填写的表单数据
  const addTeamData = ref({...initFormData})

// const expireTimeStr = computed(() => {
//     const date = addTeamData.value.expireTime;
//     return formateTime(date, 'YYYY-MM-DD'); // 根据本地时间格式化
// });

// const expireTimePickStr = computed(() => {
//     const date = addTeamData.value.expireTime;
//     return getYearMonthDay(date); // 根据本地时间格式化
// });
  
  // 提交
  const onSubmit = async () => {
    const postData = {
      ...addTeamData.value,
      status: Number(addTeamData.value.status)
    }
    // todo 前端参数校验
    const res: Result = await myAxios.post("/team/add", postData);
    if (res?.code === 0 && res.data){
      showSuccessToast('添加成功');
      router.push({
        path: '/team',
        replace: true,
      });
    } else {
      showFailToast('添加失败');
    }
  }

  const onConfirm = ( selectedValues ) => {
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
  