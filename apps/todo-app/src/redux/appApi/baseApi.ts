import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { environment } from '../../environments/environment';

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: environment.apiURL}),
  tagTypes: ['Tasks', 'Categories', 'Users'],
  endpoints: (build) => ({
  }),
});
