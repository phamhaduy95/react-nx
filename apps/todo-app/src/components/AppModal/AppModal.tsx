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
import { ManageCategoriesModal } from '../CategoryModal';
import { DeleteCategoryModal } from '../CategoryModal/DeleteCategoryModal';
import CategoryFilterModal from '../CategoryFilterModal/CategoryFilterModal';
import { useRegisterResultToModal } from './useRegisterResultToModal';

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

  const [, addCategoryResult] = appApi.useAddCategoryMutation({
    fixedCacheKey: 'shared-add-category',
  });

  const [, updateCategoryResult] = appApi.useUpdateCategoryMutation({
    fixedCacheKey: 'shared-update-category',
  });

  const [, deleteCategoryResult] = appApi.useDeleteCategoryMutation({
    fixedCacheKey: 'shared-delete-category',
  });


  useRegisterResultToModal(updateResult);
  useRegisterResultToModal(addResult);
  useRegisterResultToModal(deleteResult);
  useRegisterResultToModal(addCategoryResult);
  useRegisterResultToModal(updateCategoryResult);
  useRegisterResultToModal(deleteCategoryResult);

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
      case ModalType.addAndUpdateCategory:
        return <AddAndUpdateCategoryModal />;
      case ModalType.manageCategories:
        return <ManageCategoriesModal />;
      case ModalType.deleteCategory:
        return <DeleteCategoryModal />;
      case ModalType.filterCategory:
        return <CategoryFilterModal />;
      default:
        return <></>;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      switch (key) {
        case 'Escape': {
          dispatch(action.AppModal.closeModal());
          return;
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
