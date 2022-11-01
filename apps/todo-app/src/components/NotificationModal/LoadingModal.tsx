import {
  IconButton,
  LoadingSpinnerV2,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@phduylib/my-component';
import { useAppAction, useAppDispatch } from '../../redux';
import CloseIcon from '@mui/icons-material/Close';
import './NotificationModal.scss';

export function LoadingModal() {
  const dispatch = useAppDispatch();
  const action = useAppAction();
  const closeSignal = () => {
    dispatch(action.AppModal.closeModal());
  };

  return (
    <>
      <ModalHeader className="AppModal__Header">
        <span className="AppModal__Title">Loading...</span>
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
        <LoadingSpinnerV2 className="AppModal__Spinner" variant="primary" />
        <span className="AppModal__Message --Loading">Loading...</span>
      </ModalBody>
      <ModalFooter className="AppModal__Footer">
        <></>
      </ModalFooter>
    </>
  );
}
