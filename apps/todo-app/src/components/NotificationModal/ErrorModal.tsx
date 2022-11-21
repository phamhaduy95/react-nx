import {
  Button,
  IconButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@phduylib/my-component';
import { useAppAction, useAppDispatch, useAppSelector } from '../../redux';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import './NotificationModal.scss';
import shallow from 'zustand/shallow';

export function ErrorModal() {
  const dispatch = useAppDispatch();
  const action = useAppAction();
  const closeSignal = () => {
    dispatch(action.AppModal.closeModal());
  };

  const messages = useAppSelector((state) => state.AppModal.messages, shallow);
  const renderMessage = () => {
    if (messages.length === 0)
      return <span className="AppModal__Message --Error">Error!</span>;
    return messages.map((m, i) => {
      return (
        <span className="AppModal__Message --Error" key={i}>
          {m}
        </span>
      );
    });
  };

  return (
    <>
      <ModalHeader className="AppModal__Header">
        <span className="AppModal__Title">Error</span>
        <div className="AppModal__HeaderControl">
          <IconButton
            className="AppModal__CloseButton"
            onClick={closeSignal}
            variant="secondary"
          >
            <CloseIcon />
          </IconButton>
        </div>
      </ModalHeader>
      <ModalBody className="AppModal__Body">
        <div className="AppModal__ErrorIcon">
          <ErrorOutlineIcon />
        </div>
        {renderMessage()}
      </ModalBody>
      <ModalFooter className="AppModal__Footer">
        <Button className="AppModal__SubmitButton" onClick={closeSignal}>
          Return to app
        </Button>
        <Button
          className="AppModal__CloseButton"
          onClick={closeSignal}
          type="outlined"
        >
          Retry
        </Button>
      </ModalFooter>
    </>
  );
}
