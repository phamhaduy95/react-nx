import { apiV3 } from './loginApi';
import { UpdateUserArg, ChangePasswordArg, ChangeEmailArg } from './type';

export const apiV4 = apiV3.injectEndpoints({
  endpoints: (build) => ({
    updateUser: build.mutation<Response, UpdateUserArg>({
      query: (arg) => ({
        url: 'user-data',
        method: 'PUT',
        body: (() => {
          const { email, ...userData } = arg;
          return userData;
        })(),
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'Users', id: 'sign-in' }],
    }),
    changePassword: build.mutation<Response, ChangePasswordArg>({
      query: (arg) => ({
        url: 'user-password',
        method: 'PUT',
        body: (() => {
          const { confirmPassword, ...data } = arg;
          return data;
        })(),
        credentials: 'include',
      }),
    }),
    changeEmail: build.mutation<Response, ChangeEmailArg>({
      query: (arg) => ({
        url: 'user-email',
        method: 'PUT',
        body: { ...arg },
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'Users', id: 'sign-in' }],
    }),
  }),
  overrideExisting: false,
});
