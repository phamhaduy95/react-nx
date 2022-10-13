import { TaskDataType } from '../../type/model';
import { apiV1 } from './categoryApi';
import {
  GetDayScheduleDataArg,
  GetMonthScheduleDataArg,
  GetWeekScheduleDataArg,
  ReduxDayScheduleState,
  ReduxMonthScheduleState,
  ReduxTaskData,
  ReduxWeekScheduleState,
} from './type';

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
        body: {
          ...args,
          taskId: taskId,
          userId: userId,
        } as ReduxTaskData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Tasks', id: `${arg.taskId}` },
        { type: 'Tasks', id: 'Month' },
        { type: 'Tasks', id: 'Day' },
        { type: 'Tasks', id: 'Week' },
      ],
    }),
    addTask: build.mutation<any, Omit<ReduxTaskData, 'taskId'>>({
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
    }),
  }),
  overrideExisting: false,
});
