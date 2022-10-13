import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { TaskDataType } from '../../type/model';
import { ReduxTaskData } from '../types';
import {
  GetDayScheduleDataArg,
  GetMonthScheduleDataArg,
  GetWeekScheduleDataArg,
  ReduxDayScheduleState,
  ReduxMonthScheduleState,
  ReduxWeekScheduleState,
} from './type';

// question : how to test endpoint

const userId = 'c0e86673-bce3-4608-8c32-06763581e952';

export const taskApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `https://localhost:7113/api`,
  }),
  tagTypes: ['Tasks'],
  endpoints: (build) => ({
    getTask: build.query<ReduxTaskData, TaskDataType['taskId']>({
      query: (id) => ({
        url: `tasks/${id}`,
      }),
      providesTags: (result, error, arg) => [{ type: 'Tasks', id: `${arg}` }],
      transformResponse(result: ReduxTaskData, meta, arg) {
        return result;
      },
    }),
    getMonthScheduleData: build.query<
      ReduxMonthScheduleState,
      GetMonthScheduleDataArg
    >({
      query: (arg) => ({
        url: `tasks/within-a-month`,
        params: {
          userId: userId,
          month: arg.month,
          year: arg.year,
          offset: -new Date().getTimezoneOffset(),
        },
      }),

      providesTags: (result, error, arg) => [
        { type: 'Tasks', id: `Month` },
        { type: 'Tasks', id: `${JSON.stringify(arg)}` },
      ],
      onCacheEntryAdded(arg, api) {
        console.log('month data update');
      },
      // transform response data;
      transformResponse(
        response: ReduxTaskData[],
        meta,
        arg: GetMonthScheduleDataArg
      ) {
        const { month, year } = arg;

        return {
          month: new Date(year, month - 1).toDateString(),
          tasks: response,
        };
      },
    }),
    getDayScheduleData: build.query<
      ReduxDayScheduleState,
      GetDayScheduleDataArg
    >({
      query: (arg) => ({
        url: `tasks/within-a-day`,
        params: {
          userId: userId,
          date: arg.date,
          month: arg.month,
          year: arg.year,
          offset: -new Date().getTimezoneOffset(),
        },
      }),
      providesTags: (result, error, arg) => [
        { type: 'Tasks', id: `Day` },
        { type: 'Tasks', id: `${JSON.stringify(arg)}` },
      ],
      transformResponse(
        response: ReduxTaskData[],
        meta,
        arg: GetDayScheduleDataArg
      ) {
        return {
          date: new Date(arg.year, arg.month - 1, arg.date).toDateString(),
          tasks: response,
        };
      },
      onCacheEntryAdded(arg, api) {
        console.log('day data update');
      },
    }),
    getWeekScheduleData: build.query<
      ReduxWeekScheduleState,
      GetWeekScheduleDataArg
    >({
      query: (arg) => ({
        url: `tasks/within-range`,
        params: {
          userId: userId,
          startTime: arg.startDate,
          endTime: arg.endDate,
        },
      }),
      transformResponse(
        response: ReduxTaskData[],
        meta,
        arg: GetWeekScheduleDataArg
      ) {
        return {
          startDate: arg.startDate,
          endDate: arg.endDate,
          tasks: response,
        };
      },
      providesTags: (result, error, arg) => [
        { type: 'Tasks', id: 'Week' },
        { type: 'Tasks', id: `${JSON.stringify(arg)}` },
      ],
      onCacheEntryAdded(arg, api) {
        console.log('week data update');
      },
    }),

    updateTask: build.mutation<
      Response,
      Partial<ReduxTaskData> & {
        taskId: string;
      }
    >({
      query: ({ taskId, ...args }) => ({
        url: `tasks/${taskId}`,
        method: 'PUT',
        body: { ...args },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Tasks', id: `${arg.taskId}` },
        { type: 'Tasks', id: 'Month' },
        { type: 'Tasks', id: 'Day' },
        { type: 'Tasks', id: 'Week' },
      ],
      // async onQueryStarted(arg, api) {
      //   const rootState = api.getState() as RootState;
      //   try {
      //     await api.queryFulfilled;
      //     const taskId = arg.taskId;
      //     // update the monthSchedule data directly without re-fetching when the updating task request is finished. Doing so will eliminate the one expensive re-fetching for monthSchedule data.
      //     {
      //       const { month, tasks } = rootState.monthSchedule;
      //       const index = tasks.findIndex((e) => e.taskId === taskId);
      //       const monthInDate = new Date(month);
      //       if (index !== -1) {
      //         api.dispatch(
      //           taskApi.util.updateQueryData(
      //             'getMonthScheduleData',
      //             {
      //               month: monthInDate.getMonth(),
      //               year: monthInDate.getFullYear(),
      //             },
      //             (draft) => {
      //               const { taskId, ...patch } = arg;
      //               const oldTaskData = draft.tasks[index];
      //               draft.tasks[index] = { ...oldTaskData, ...patch };
      //             }
      //           )
      //         );
      //       }
      //     }
      //     // update the daySchedule data directly without re-fetching when the updating task request is finished.
      //     {
      //       const { date, tasksList } = rootState.daySchedule;
      //       const index = tasksList.findIndex((e) => e.taskId === taskId);
      //       const dateObj = new Date(date);
      //       if (index !== -1) {
      //         api.dispatch(
      //           taskApi.util.updateQueryData(
      //             'getDayScheduleData',
      //             {
      //               date: dateObj.getDate(),
      //               month: dateObj.getMonth(),
      //               year: dateObj.getFullYear(),
      //             },
      //             (draft) => {
      //               const { taskId, ...patch } = arg;
      //               const oldTaskData = draft.tasksList[index];
      //               draft.tasksList[index] = { ...oldTaskData, ...patch };
      //             }
      //           )
      //         );
      //       }
      //     }
      //     // update the weekSchedule data directly without re-fetching when the updating task request is finished.
      //     {
      //       const { endDate, startDate, tasks } = rootState.weekSchedule;
      //       const index = tasks.findIndex((e) => e.taskId === taskId);
      //       if (index !== 1) {
      //         api.dispatch(
      //           taskApi.util.updateQueryData(
      //             'getWeekScheduleData',
      //             {
      //               endDate: endDate,
      //               startDate: startDate,
      //             },
      //             (draft) => {
      //               const { taskId, ...patch } = arg;
      //               const oldTaskData = draft.tasks[index];
      //               draft.tasks[index] = { ...oldTaskData, ...patch };
      //             }
      //           )
      //         );
      //       }
      //     }
      //     const {} = rootState.daySchedule;
      //   } catch (e) {}
      // },
    }),
    addTask: build.mutation<any, Omit<ReduxTaskData, 'taskId'>>({
      query: (arg) => ({
        url: `tasks`,
        method: 'POST',
        body: { ...arg, userId },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Tasks', id: 'Month' },
        { type: 'Tasks', id: 'Day' },
        { type: 'Tasks', id: 'Week' },
      ],
    }),
    deleteTask: build.mutation<any, ReduxTaskData['taskId']>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Tasks', id: `${arg}` },
        { type: 'Tasks', id: 'Month' },
        { type: 'Tasks', id: 'Day' },
        { type: 'Tasks', id: 'Week' },
      ],
      // async onQueryStarted(id, api) {
      //   const rootState = api.getState() as RootState;
      //   const a = rootState.api.provided;
      //   const d = rootState.api.provided;

      //   debugger
      //   try {
      //     await api.queryFulfilled;
      //     {
      //       const { tasks, month } = rootState.monthSchedule;

      //       const index = tasks.findIndex((e) => e.taskId === id);
      //       const monthInDate = new Date(month);
      //       if (index !== -1) {
      //         api.dispatch(
      //           taskApi.util.updateQueryData(
      //             'getMonthScheduleData',
      //             {
      //               month: monthInDate.getMonth(),
      //               year: monthInDate.getFullYear(),
      //             },
      //             (draft) => {
      //               draft.tasks = draft.tasks.filter((e) => e.taskId !== id);
      //               console.log("delete");
      //               console.log(tasks);
      //             }
      //           )
      //         );
      //       }
      //     }
      //     {
      //       const { tasksList, date } = rootState.daySchedule;
      //       const index = tasksList.findIndex((e) => e.taskId === id);
      //       const dateObj = new Date(date);
      //       if (index !== -1) {
      //         api.dispatch(
      //           taskApi.util.updateQueryData(
      //             'getDayScheduleData',
      //             {
      //               date: dateObj.getDate(),
      //               month: dateObj.getMonth(),
      //               year: dateObj.getFullYear(),
      //             },
      //             (draft) => {
      //               draft.tasksList = draft.tasksList.filter(
      //                 (e) => e.taskId !== id
      //               );
      //             }
      //           )
      //         );
      //       }
      //     }
      //   } catch (e) {}
      // },
    }),
  }),
});

function getStringifyMonthIdFromTimeStr(timeStr: string) {
  const dateObj = new Date(timeStr);
  const month = {
    month: dateObj.getMonth(),
    year: dateObj.getFullYear(),
  };
  return JSON.stringify(month);
}

function getStringDayIdFromTimeStr(timeStr: string) {
  const dateObj = new Date(timeStr);
  const month = {
    date: dateObj.getDate(),
    month: dateObj.getMonth(),
    year: dateObj.getFullYear(),
  };
  return JSON.stringify(month);
}
