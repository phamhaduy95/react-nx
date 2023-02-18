import { useEffect } from 'react';
import { useAppAction, useAppDispatch, useAppSelector } from '../redux';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { ModalType } from '../type/model';


export function useRegisterResultToModal(result: any) {
  const action = useAppAction();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.AppModal.isOpen);
  useEffect(() => {
    const { isLoading, isError, isSuccess } = result;
    // console.table({isSuccess,isLoading, isError});
    if (isLoading) {
      dispatch(action.AppModal.openModal(ModalType.loading));
      return;
    }
    if (isSuccess) {
      dispatch(action.AppModal.openModal(ModalType.success));
      return;
    }
    if (isError) {
      dispatch(action.AppModal.openModal(ModalType.error));
      const error = result.error as FetchBaseQueryError;
      switch (error.status) {
        case 'FETCH_ERROR': {
          dispatch(
            action.AppModal.updateMessages(['Fail to connect to server!'])
          );
          return;
        }
      }
    }
  }, [result]);

  useEffect(() => {
    if (isOpen) {
      result.reset();
    }
    dispatch(action.AppModal.toggleCloseOnClickOutside(true));
  }, [isOpen]);
}
