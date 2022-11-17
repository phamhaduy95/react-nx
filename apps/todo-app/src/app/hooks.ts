import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appApi } from '../redux/appApi';

export function useUserAuthenticate() {
  const navigate = useNavigate();
  const response = appApi.useAuthenticateQuery('', {});

  useLayoutEffect(() => {
    const error = response.error as FetchBaseQueryError;
    if (error) {
      navigate('/login');
      return;
    }
  }, [response]);
  return response;
}
