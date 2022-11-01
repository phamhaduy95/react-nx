import { IconButton, Modal, ModalHeader, ModalProps } from '@phduylib/my-component';
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
  const isOpen = useAppSelector((state) => state.TaskEditModal.isOpen);
  const isinIdleState = useAppSelector(
    (state) => state.TaskEditModal.state === 'idle'
  );
  const type = useAppSelector((state) => state.TaskEditModal.type);

  const restrictClose = useAppSelector(
    (state) => state.TaskEditModal.restrictClose
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
   
      dispatch(action.TaskEditModal.toggleDrawerOpen(true));
      dispatch(action.TaskEditModal.switchModalState('loading'));
      return;
    }
    if (
      updateResult.isSuccess ||
      addResult.isSuccess ||
      deleteResult.isSuccess
    ) {
      dispatch(action.TaskEditModal.toggleDrawerOpen(true));
      dispatch(action.TaskEditModal.switchModalState('success'));
      return;
    }
    if (updateResult.isError || addResult.isError || deleteResult.isError) {
      dispatch(action.TaskEditModal.toggleDrawerOpen(true));
      dispatch(action.TaskEditModal.switchModalState('error'));
      return;
    }
      dispatch(action.TaskEditModal.switchModalState("idle"));
  }, [updateResult, addResult,deleteResult]);

  useEffect(() => {
    if (isOpen) {
      updateResult.reset();
      addResult.reset();
      deleteResult.reset();
    }
  }, [isOpen]);

  const handleModalToggle: ModalProps['onToggle'] = useCallback((isOpen) => {
    dispatch(action.TaskEditModal.toggleDrawerOpen(isOpen));
  }, []);

  const closeModalSignal = () => {
    dispatch(action.TaskEditModal.toggleDrawerOpen(false));
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
    dispatch(action.TaskEditModal.switchModalType('delete'));
  };

  const DeleteTaskButton = isinIdleState && type === 'update' && (
    <IconButton
      className="TaskEditModal__DeleteTaskButton"
      onClick={handleDeleteButtonClick}
      variant="secondary"
    >
      <DeleteForeverIcon />
    </IconButton>
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
          <IconButton
            className="TaskEditModal__CloseButton"
            onClick={closeModalSignal}
            variant="secondary"
          >
            <CloseIcon />
          </IconButton>
        </div>
      </ModalHeader>
      {renderModalContent()}
    </Modal>
  );
}
