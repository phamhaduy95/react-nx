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

export const apiV2 = apiV1.injectEndpoints({
  endpoints: (build) => ({
    getTask: build.query<ReduxTaskData, TaskDataType['taskId']>({
      query: (id) => ({
        url: `tasks/${id}`,
        credentials: 'include',
      }),
      providesTags: (result, error, arg) => [{ type: 'Tasks', id: `${arg}` }],
      transformResponse(result: ReduxTaskData, meta, arg) {
        return result;
      },
    }),
    getAllTaskInCurrentHour: build.query<ReduxTaskData[], undefined>({
      query: () => {
        const startDate = dayjs().startOf('hour').toISOString();
        const endDate = dayjs().endOf('hour').toISOString();
        return {
          url: `tasks/within-range`,
          params: {
            startDate: startDate,
            endDate: endDate,
          },
        };
      },
      keepUnusedDataFor: 1,
      providesTags: [{ type: 'Tasks' }],
    }),

    getMonthScheduleData: build.query<
      ReduxMonthScheduleState,
      GetMonthScheduleDataArg
    >({
      query: (arg) => ({
        url: `tasks/within-a-month`,
        params: {
          month: arg.month,
          year: arg.year,
          offset: -new Date().getTimezoneOffset(),
        },
        credentials: 'include',
      }),
      providesTags: [{ type: 'Tasks', id: `Month` }, { type: 'Tasks' }],

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
        credentials: 'include',
        params: {
          date: arg.date,
          month: arg.month,
          year: arg.year,
          offset: -new Date().getTimezoneOffset(),
        },
      }),
      providesTags: [{ type: 'Tasks', id: `Day` }, { type: 'Tasks' }],
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
          startTime: arg.startDate,
          endTime: arg.endDate,
        },
        credentials: 'include',
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
      providesTags: [{ type: 'Tasks', id: 'Week' }, { type: 'Tasks' }],

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
        credentials: 'include',
        body: {
          ...args,
          taskId: taskId,
        } as ReduxTaskData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Tasks', id: `${arg.taskId}` },
        { type: 'Tasks', id: 'Month' },
        { type: 'Tasks', id: 'Day' },
        { type: 'Tasks', id: 'Week' },
      ],
    }),
    addTask: build.mutation<AddTaskResponse, Omit<ReduxTaskData, 'taskId'>>({
      query: (arg) => ({
        url: `tasks`,
        method: 'POST',
        credentials: 'include',
        body: {
          title: arg.title,
          categoryId: arg.categoryId,
          description: arg.description,
          endTime: arg.endTime,
          startTime: arg.startTime,
        } as ReduxTaskData,
      }),

      async onQueryStarted(arg, api) {
        const { queryFulfilled, dispatch, getState } = api;
        const rootState = getState() as RootState;
        const dateArgs = rootState.CalendarApp.dateArgs;
        try {
          const response = await queryFulfilled;
          const taskId = response.data.taskId;
          const dayArg = dateArgs.dateArg;
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
          const monthArg = dateArgs.monthArg;
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
          const week = dateArgs.weekArg;
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
        credentials: 'include',
      }),

      invalidatesTags: (result, error, arg) => [
        { type: 'Tasks', id: `${arg}` },
        { type: 'Tasks' },
      ],
    }),
  }),
  overrideExisting: false,
});
