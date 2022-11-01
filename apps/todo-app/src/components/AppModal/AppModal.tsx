import { Modal } from '@phduylib/my-component';
import React, { useCallback, useEffect } from 'react';
import {
  ModalType,
  useAppAction,
  useAppDispatch,
  useAppSelector,
} from '../../redux';
import { ErrorModal, LoadingModal } from '../NotificationModal';
import { DeleteTaskModal } from '../TaskModal';
import { AddAndUpdateTaskModal } from '../TaskModal/AddAndUpdateTaskModal';
import { SuccessModal } from '../NotificationModal/SuccessModal';
import { appApi } from '../../redux/appApi';
import './AppModal.scss';
import { AddAndUpdateCategoryModal } from '../CategoryModal/AddAndUpdateCategoryModal';

export function AppModal() {
  const action = useAppAction();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.AppModal.isOpen);
  const handleModalToggle = useCallback((isOpen: boolean) => {
    if (isOpen === false) {
      dispatch(action.AppModal.closeModal());
    }
  }, []);

  const enableCloseOnClickOutside = useAppSelector(
    (state) => state.AppModal.closeOnClickOutside
  );
  const modalType = useAppSelector((state) => state.AppModal.modalType);
  const [, updateResult] = appApi.useUpdateTaskMutation({
    fixedCacheKey: 'shared-update-task',
  });
  const [, addResult] = appApi.useAddTaskMutation({
    fixedCacheKey: 'shared-add-task',
  });

  const [, deleteResult] = appApi.useDeleteTaskMutation({
    fixedCacheKey: 'shared-delete-task',
  });

  useEffect(() => {
    if (
      updateResult.isLoading ||
      addResult.isLoading ||
      deleteResult.isLoading
    ) {
      dispatch(action.AppModal.openModal(ModalType.loading));

      return;
    }
    if (
      updateResult.isSuccess ||
      addResult.isSuccess ||
      deleteResult.isSuccess
    ) {
      dispatch(action.AppModal.openModal(ModalType.success));
      return;
    }
    if (updateResult.isError || addResult.isError || deleteResult.isError) {
      dispatch(action.AppModal.openModal(ModalType.error));
      return;
    }
  }, [updateResult, addResult, deleteResult]);

  useEffect(() => {
    if (isOpen) {
      updateResult.reset();
      addResult.reset();
      deleteResult.reset();
    }
  }, [isOpen]);

  const renderModalContent = () => {
    switch (modalType) {
      case ModalType.addAndUpdateTask:
        return <AddAndUpdateTaskModal />;
      case ModalType.deleteTask:
        return <DeleteTaskModal />;
      case ModalType.error:
        return <ErrorModal />;
      case ModalType.loading:
        return <LoadingModal />;
      case ModalType.success:
        return <SuccessModal />;
      case ModalType.addCategory:
        return <AddAndUpdateCategoryModal />;
      default:
        return <></>;
    }
  };

  return (
    <Modal
      className="AppModal"
      isOpen={isOpen}
      onToggle={handleModalToggle}
      clickOutsideToClose={enableCloseOnClickOutside}
    >
      {renderModalContent()}
    </Modal>
  );
}
