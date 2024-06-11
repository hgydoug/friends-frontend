import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn');  

   // 使用计算属性来格式化时间
  //  const formattedTime = computed(() => {
  //     const date = new Date(time.value);
  //     return date.toLocaleString();
  //   });

  // 使用方法来格式化时间
const formateTime = (date: Date | undefined, format: string='YYYY-MM-DD HH:mm:ss') => {
    if(!date) {
        return "";
    }
    const str = moment(date).format(format)
    return str;
}

const getYearMonthDay = (date: Date | undefined)  => {
    if (!date) {
        return [];
    }
    return [moment(date).year().toString(), (moment(date).month() + 1).toString(), moment(date).date().toString()]
}

export {
    formateTime,
    getYearMonthDay
}