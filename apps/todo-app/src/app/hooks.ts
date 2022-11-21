import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appApi } from '../redux/appApi';

export function useUserAuthenticate() {
  const navigate = useNavigate();
  const response = appApi.useAuthenticateQuery('', {});

  useLayoutEffect(() => {
    const { isError } = response;
    if (isError) {
      const error = response.error as FetchBaseQueryError;
      switch (error.status) {
        case 'FETCH_ERROR':
          navigate('/fail-connection');
          return;
        case 401: {
          navigate('/login');
          return;
        }
      }
    }
  }, [response]);
  return response;
}
