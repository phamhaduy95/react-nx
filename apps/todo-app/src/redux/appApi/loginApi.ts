import { ReduxUserData } from '../types';
import { apiV2 } from './taskApi';
import { LoginArg, ServerResponseType, SignUpArg } from './type';

export const apiV3 = apiV2.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation<ServerResponseType, LoginArg>({
      query: (arg) => ({
        url: 'signin',
        method: 'POST',
        credentials: 'include',
        body: {
          email: arg.email,
          password: arg.password,
          client: 'browser',
        },
      }),
      invalidatesTags: [{ type: 'Tasks' }, { type: 'Categories' }],
    }),
    signOut: build.mutation<ServerResponseType, undefined>({
      query: () => ({
        url: 'signout',
        method: 'POST',
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'Users', id: 'sign-in' }],
    }),
    authenticate: build.query<ReduxUserData, string>({
      query: (arg) => ({
        url: 'authenticate',
        credentials: 'include',
      }),
      keepUnusedDataFor: 120,
      providesTags: [{ type: 'Users', id: 'sign-in' }],
    }),
    signUp: build.mutation<ServerResponseType, SignUpArg>({
      query: (arg) => ({
        url: 'sign-up',
        method: 'POST',
        credentials: 'include',
        body: {
          email: arg.email,
          displayName: arg.displayName,
          password: arg.password,
          client: 'browser',
        },
      }),
      invalidatesTags: [
        { type: 'Users', id: 'sign-in' },
        { type: 'Tasks' },
        { type: 'Categories' },
      ],
    }),
  }),
  overrideExisting: false,
});
