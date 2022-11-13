import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { appApi } from 'apps/todo-app/src/redux/appApi';
import { useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useCheckLogin() {
  const navigate = useNavigate();
  const response = appApi.useAuthenticateQuery('', {});

  useLayoutEffect(() => {
    if (response.data !== undefined) {
      navigate('/');
    }
  }, [response]);
  return response;
}
