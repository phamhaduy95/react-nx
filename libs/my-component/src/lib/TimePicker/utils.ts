import dayjs from 'dayjs';
import { Time } from '../TimePanel/types';

export function convertTimeToDateType(time: Time) {
  const { hour, minute, second } = time;
  const dateObject = dayjs().hour(hour).minute(minute).second(second).toDate();
  return dateObject;
}

export function convertDateToTimeObject(date:Date){
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return {
        hour,minute,second
    } as Time;
}