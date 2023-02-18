import {
  Button,
  IconButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@phduylib/my-component';
import { useAppAction, useAppDispatch, useAppSelector } from '../../redux';
import { appApi } from '../../redux/appApi';
import CloseIcon from '@mui/icons-material/Close';
import './TaskModal.scss';

export function DeleteTaskModal() {
  const action = useAppAction();
  const dispatch = useAppDispatch();
  const taskId = useAppSelector((state) => state.TaskEditModal.taskData.taskId);
  const [deleteTask] = appApi.useDeleteTaskMutation({
    fixedCacheKey: 'shared',
  });

  const handleUserCloseModal = () => {
    dispatch(action.AppModal.closeModal());
  };

  const handleSubmitButtonClick = () => {
    deleteTask(taskId);
  };

  const handleCancelButtonClick = () => {
    dispatch(action.TaskEditModal.switchModalType('update'));
  };

  return (
    <>
      <ModalHeader className="AppModal__Header">
        <span className="AppModal__Title">Delete Task</span>
        <div className="AppModal__HeaderControl">
          <IconButton
            className="AppModal__CloseButton"
            onClick={handleUserCloseModal}
            variant="secondary"
          >
            <CloseIcon />
          </IconButton>
        </div>
      </ModalHeader>
      <ModalBody className="AppModal__Body">
        <span className="AppModal__Message">
          Do want to delete this task from schedule permanently?
        </span>
      </ModalBody>
      <ModalFooter className="AppModal__Footer">
        <Button
          className="AppModal__SubmitButton"
          onClick={handleSubmitButtonClick}
        >
          Delete
        </Button>
        <Button
          className="AppModal__CancelButton"
          onClick={handleCancelButtonClick}
          type="outlined"
        >
          Return
        </Button>
      </ModalFooter>
    </>
  );
}
