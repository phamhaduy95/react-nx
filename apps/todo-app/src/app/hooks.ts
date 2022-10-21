import dayjs from 'dayjs';
import { useEffect } from 'react';
import { appApi } from '../redux/appApi';

import { ReduxTaskData } from '../redux/appApi/type';

const EmptyArray:ReduxTaskData[] = [];

// custom hook
export function useNotifyTasksGoingToEnd(){
    const {tasksWillEnd,refetch} = appApi.useGetAllTaskInCurrentHourQuery(undefined,{
        pollingInterval:60*60, 
        refetchOnReconnect:true,
        selectFromResult:({data})=>{
            if (data === undefined) return {tasksWillEnd:EmptyArray};
            const tasksWillEnd = findTaskWillEndInThisHour(data);
            return {tasksWillEnd:tasksWillEnd}
        }
    });

    useEffect(()=>{
        const registerTimeOuts = tasksWillEnd.map(e=>{
            const currHourStart = dayjs().startOf("hour");
            const endTime =  dayjs(e.endTime);
            

        }) 

    },[tasksWillEnd])
}

function findTaskWillEndInThisHour(tasks:ReduxTaskData[]){
    const tasksEndedSoon = tasks.filter((e)=>{
        const hourStart = dayjs().startOf("hour").add(-1,"minute");
        const hourEnd = dayjs().endOf("hour").add(1,"minute");
        return  dayjs(e.endTime).isAfter(hourStart,"minute") && dayjs(e.endTime).isBefore(hourEnd,"hour");
    } );
    return tasksEndedSoon;     
}


