import { Modal, ModalHeader, ModalProps } from '@phduylib/my-component';
import './TaskEditModal.scss';
import {
  useAppAction,
  useAppDispatch,
  useAppSelector,
} from '../../redux/rootStore';

import { useCallback, useEffect } from 'react';
import { appApi } from '../../redux/appApi';

import { AddAndEditTaskModal } from './AddAndEditTaskModal';
import { NotificationModal } from './NotificationModal';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { DeleteTaskModal } from './DeleteTaskModal';

export function TaskEditModal() {
  const dispatch = useAppDispatch();
  const action = useAppAction();
  const isOpen = useAppSelector((state) => state.taskEditModal.isOpen);
  const isinIdleState = useAppSelector(
    (state) => state.taskEditModal.state === 'idle'
  );
  const type = useAppSelector((state) => state.taskEditModal.type);

  const restrictClose = useAppSelector(
    (state) => state.taskEditModal.restrictClose
  );
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
   
      dispatch(action.taskEditModal.toggleDrawerOpen(true));
      dispatch(action.taskEditModal.switchModalState('loading'));
      return;
    }
    if (
      updateResult.isSuccess ||
      addResult.isSuccess ||
      deleteResult.isSuccess
    ) {
      dispatch(action.taskEditModal.toggleDrawerOpen(true));
      dispatch(action.taskEditModal.switchModalState('success'));
      return;
    }
    if (updateResult.isError || addResult.isError || deleteResult.isError) {
      dispatch(action.taskEditModal.toggleDrawerOpen(true));
      dispatch(action.taskEditModal.switchModalState('error'));
      return;
    }
      dispatch(action.taskEditModal.switchModalState("idle"));
  }, [updateResult, addResult,deleteResult]);

  useEffect(() => {
    if (isOpen) {
      updateResult.reset();
      addResult.reset();
      deleteResult.reset();
    }
  }, [isOpen]);

  const handleModalToggle: ModalProps['onToggle'] = useCallback((isOpen) => {
    dispatch(action.taskEditModal.toggleDrawerOpen(isOpen));
  }, []);

  const closeModalSignal = () => {
    dispatch(action.taskEditModal.toggleDrawerOpen(false));
  };

  const renderModalContent = () => {
    if (!isinIdleState) return <NotificationModal />;
    if (type === 'delete') return <DeleteTaskModal />;
    return <AddAndEditTaskModal />;
  };

  const renderTitle = () => {
    switch (type) {
      case 'delete':
        return 'Delete Task';
      case 'update':
        return 'Update Task';
      case 'add':
        return 'Add Task';
    }
  };

  const handleDeleteButtonClick = () => {
    dispatch(action.taskEditModal.switchModalType('delete'));
  };

  const DeleteTaskButton = isinIdleState && type === 'update' && (
    <button
      className="TaskEditModal__DeleteTaskButton"
      onClick={handleDeleteButtonClick}
    >
      <DeleteForeverIcon />
    </button>
  );

  return (
    <Modal
      isOpen={isOpen}
      className="TaskEditModal"
      onToggle={handleModalToggle}
      clickOutsideToClose={!restrictClose}
    >
      <ModalHeader className="TaskEditModal__Header">
        <span className="TaskEditModal__Title">{renderTitle()}</span>
        <div className="TaskEditModal__HeaderControl">
          {DeleteTaskButton}
          <button
            className="TaskEditModal__CloseButton"
            onClick={closeModalSignal}
          >
            <CloseIcon />
          </button>
        </div>
      </ModalHeader>
      {renderModalContent()}
    </Modal>
  );
}
