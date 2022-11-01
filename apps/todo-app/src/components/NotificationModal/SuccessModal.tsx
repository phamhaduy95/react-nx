import {
  Button,
  IconButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@phduylib/my-component';
import { useAppAction, useAppDispatch } from '../../redux';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import './NotificationModal.scss';

export function SuccessModal() {
  const dispatch = useAppDispatch();
  const action = useAppAction();
  const closeSignal = () => {
    dispatch(action.AppModal.closeModal());
  };

  return (
    <>
      <ModalHeader className="AppModal__Header">
        <span className="AppModal__Title">Success</span>
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
        <div className="AppModal__SuccessIcon">
          <CheckCircleOutlineIcon />
        </div>
        <span className="AppModal__Message --Success">Success</span>
      </ModalBody>
      <ModalFooter className="AppModal__Footer">
        <Button
          className="AppModal__ReturnButton"
          onClick={closeSignal}
          type="outlined"
          variant="success"
        >
          Return to App
        </Button>
      </ModalFooter>
    </>
  );
}
