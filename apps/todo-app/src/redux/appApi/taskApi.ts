import { TaskDataType } from '../../type/model';
import { apiV1 } from './categoryApi';
import { RootState } from '../rootStore';
import {
  AddTaskResponse,
  GetDayScheduleDataArg,
  GetMonthScheduleDataArg,
  GetWeekScheduleDataArg,
  ReduxDayScheduleState,
  ReduxMonthScheduleState,
  ReduxTaskData,
  ReduxWeekScheduleState,
} from './type';
import dayjs from 'dayjs';

const userId = 'c0e86673-bce3-4608-8c32-06763581e952';

export const apiV2 = apiV1.injectEndpoints({
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
    getAllTaskInCurrentHour: build.query<ReduxTaskData[],undefined>({
      query:()=>{
          const startDate = dayjs().startOf("hour").toISOString();
          const endDate = dayjs().endOf("hour").toISOString();
          return {
            url: `tasks/within-range`,
            params: {
              userId: userId,
              startDate:startDate,
              endDate:endDate,
            }
          }
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
      keepUnusedDataFor: 1,
      providesTags: (result, error, arg) => [
        { type: 'Tasks', id: `Month` },
      ],
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
      keepUnusedDataFor: 1,
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
      ],
      onCacheEntryAdded(arg, api) {
        console.log('week data update');
      },
      keepUnusedDataFor: 1,
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
        body: {
          ...args,
          taskId: taskId,
          userId: userId,
        } as ReduxTaskData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Tasks', id: `${arg.taskId}` },
        // { type: 'Tasks', id: 'Month' },
        // { type: 'Tasks', id: 'Day' },
        // { type: 'Tasks', id: 'Week' },
      ],
      async onQueryStarted(arg, api) {
        const { queryFulfilled, getState, dispatch } = api;
        const rootState = getState() as RootState;
        const taskId = arg.taskId;
        try {
          const response = await queryFulfilled;

          const dayArg = rootState.saveDateArg.dateArg;
          dispatch(
            apiV2.util.updateQueryData(
              'getDayScheduleData',
              dayArg,
              (draft) => {
                const index = draft.tasks.findIndex((e) => e.taskId === taskId);
                if (index === -1) return;
                const taskToUpdate = draft.tasks[index];
                draft.tasks[index] = { ...taskToUpdate, ...arg };
              }
            )
          );
          const monthArg = rootState.saveDateArg.monthArg;
          dispatch(
            apiV2.util.updateQueryData(
              'getMonthScheduleData',
              monthArg,
              (draft) => {
                const index = draft.tasks.findIndex((e) => e.taskId === taskId);
                if (index === -1) return;
                const taskToUpdate = draft.tasks[index];
                draft.tasks[index] = { ...taskToUpdate, ...arg };
              }
            )
          );
          const week = rootState.saveDateArg.weekArg;
          dispatch(
            apiV2.util.updateQueryData('getWeekScheduleData', week, (draft) => {
              const index = draft.tasks.findIndex((e) => e.taskId === taskId);
              if (index === -1) return;
              const taskToUpdate = draft.tasks[index];
              draft.tasks[index] = { ...taskToUpdate, ...arg };
            })
          );
        } catch (e) {}
      },
    }),
    addTask: build.mutation<AddTaskResponse, Omit<ReduxTaskData, 'taskId'>>({
      query: (arg) => ({
        url: `tasks`,
        method: 'POST',
        body: {
          title: arg.title,
          categoryId: arg.categoryId,
          description: arg.description,
          endTime: arg.endTime,
          startTime: arg.startTime,
          userId: userId,
        } as ReduxTaskData,
      }),
      invalidatesTags: (result, error, arg) => [
        // { type: 'Tasks', id: 'Month' },
        // { type: 'Tasks', id: 'Day' },
        // { type: 'Tasks', id: 'Week' },
      ],
      async onQueryStarted(arg, api) {
        const { queryFulfilled, dispatch, getState } = api;
        const rootState = getState() as RootState;

        try {
          const response = await queryFulfilled;
          const taskId = response.data.taskId;
          const dayArg = rootState.saveDateArg.dateArg;
          dispatch(
            apiV2.util.updateQueryData(
              'getDayScheduleData',
              dayArg,
              (draft) => {
                const task: ReduxTaskData = { ...arg, taskId };
                draft.tasks.push(task);
              }
            )
          );
          const monthArg = rootState.saveDateArg.monthArg;
          dispatch(
            apiV2.util.updateQueryData(
              'getMonthScheduleData',
              monthArg,
              (draft) => {
                const task: ReduxTaskData = { ...arg, taskId };
                draft.tasks.push(task);
              }
            )
          );
          const week = rootState.saveDateArg.weekArg;
          dispatch(
            apiV2.util.updateQueryData('getWeekScheduleData', week, (draft) => {
              const task: ReduxTaskData = { ...arg, taskId };
              draft.tasks.push(task);
            })
          );
        } catch (e) {}
      },
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
    }),
  }),
  overrideExisting: false,
});
