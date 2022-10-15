import { baseApi } from "./baseApi";
import { ReduxCategoryData, ResponseCategoryData } from "./type";
const userId = 'c0e86673-bce3-4608-8c32-06763581e952';
export const apiV1 = baseApi.injectEndpoints({
    endpoints:(build)=>({
        getAllForUser: build.query<ReduxCategoryData[], undefined>({
            query: () => ({
              url: `categories/all`,
              params: {
                userId:userId
              }
            }),
            transformResponse(
              response: ResponseCategoryData[],
              meta,
              arg: undefined
            ) {
              const result: ReduxCategoryData[] = response.map((e) => ({
                categoryId: e.categoryId,
                name: e.name,
              }));
              return result;
            },
            providesTags: (result, error, arg) => {
              if (result === undefined) return [{ type: 'Categories', id: 'List' }];
              return result.map((e) => ({ type: 'Categories', id: e.categoryId }));
            },
          }),
          getCategoryById: build.query<ReduxCategoryData, string>({
            query: (arg) => ({
              url: `categories/${arg}`,
            }),
      
            transformResponse(response: ResponseCategoryData, meta, arg: string) {
              return {
                categoryId: response.categoryId,
                name: response.name,
              } as ReduxCategoryData;
            },
      
            providesTags: (result, error, arg) => [
              { type: 'Categories', id: `${arg}` },
            ],
          }),
    }),
    overrideExisting: false,
})