import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7113/api' }),
  tagTypes: ['Tasks', 'Categories'],
  endpoints: (build) => ({
    getA: build.query<number, number>({
      query: (arg) => ({
        url: '',
      }),
    }),
  }),
});
