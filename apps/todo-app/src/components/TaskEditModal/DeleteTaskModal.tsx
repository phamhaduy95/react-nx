import { ModalBody, ModalFooter } from '@phduylib/my-component';
import React from 'react';
import { useAppAction, useAppDispatch, useAppSelector } from '../../redux';
import { appApi } from '../../redux/appApi';

export function DeleteTaskModal() {
  const action = useAppAction();
  const dispatch = useAppDispatch();
  const taskId = useAppSelector((state) => state.taskEditModal.taskData.taskId);
  const [deleteTask] = appApi.useDeleteTaskMutation({
    fixedCacheKey: 'shared-delete-task',
  });

  const handleSubmitButtonClick = () => {
    deleteTask(taskId);
  };

  const handleCancelButtonClick = () => {
    dispatch(action.taskEditModal.switchModalType("update"));
  };

  return (
    <>
      <ModalBody className="TaskEditModal__Body">
        <span className="TaskEditModal__Message">
          Do want to delete this task from schedule permanently?
        </span>
      </ModalBody>
      <ModalFooter className="TaskEditModal__Footer">
        <button
          className="TaskEditModal__SubmitButton"
          onClick={handleSubmitButtonClick}
        >
          Delete
        </button>
        <button
          className="TaskEditModal__CancelButton"
          onClick={handleCancelButtonClick}
        >
          Return
        </button>
      </ModalFooter>
    </>
  );
}
