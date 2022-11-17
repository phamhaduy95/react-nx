import { url } from 'inspector';
import { ReduxCategoryData } from '../types';
import { baseApi } from './baseApi';
import {
  ResponseCategoryData,
  UpdateCategoryArgs,
  AddCategoryArgs,
} from './type';

export const apiV1 = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllForUser: build.query<ReduxCategoryData[], undefined>({
      query: () => ({
        url: `categories/all`,
        credentials: 'include',
      }),
      transformResponse(
        response: ResponseCategoryData[],
        meta,
        arg: undefined
      ) {
        const result: ReduxCategoryData[] = response.map((e) => ({
          categoryId: e.categoryId,
          name: e.name,
          description: e.description,
          color: e.color,
        }));
        return result;
      },
      providesTags: (result, error, arg) => {
        return [{ type: 'Categories', id: 'List' }, { type: 'Categories' }];
      },
    }),
    getCategoryById: build.query<ReduxCategoryData, string>({
      query: (arg) => ({
        url: `categories/${arg}`,
        credentials: 'include',
      }),

      transformResponse(response: ResponseCategoryData, meta, arg: string) {
        return {
          categoryId: response.categoryId,
          name: response.name,
          color: response.color,
          description: response.description,
        } as ReduxCategoryData;
      },

      providesTags: (result, error, arg) => [
        { type: 'Categories', id: `${arg}` },
        { type: 'Categories' },
      ],
    }),
    addCategory: build.mutation<Response, AddCategoryArgs>({
      query: (arg) => ({
        url: `categories`,
        method: 'POST',
        body: {
          name: arg.name,
          description: arg.description,
          color: arg.color,
        },
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'Categories', id: 'List' }],
    }),
    deleteCategory: build.mutation<Response, ReduxCategoryData['categoryId']>({
      query: (id) => ({
        url: `categories/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'Categories', id: 'List' }],
    }),
    updateCategory: build.mutation<Response, UpdateCategoryArgs>({
      query: (arg) => ({
        url: `categories/${arg.categoryId}`,
        method: 'PUT',
        body: (() => {
          const { categoryId, ...args } = arg;
          return {
            ...args,
          };
        })(),
        credentials: 'include',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Categories', id: 'List' },
        { type: 'Categories', id: `${arg.categoryId}` },
        
      ],
    }),
  }),
  overrideExisting: false,
});
