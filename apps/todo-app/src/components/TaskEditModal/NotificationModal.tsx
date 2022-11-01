import { memo } from 'react';
import {
  Button,
  LoadingSpinnerV2,
  ModalBody,
  ModalFooter,
} from '@phduylib/my-component';
import { useAppAction, useAppDispatch } from '../../redux';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useAppSelector } from '../../redux/rootStore';

export type NotificationModalProps = {};

export const NotificationModal = memo((props: NotificationModalProps) => {
  const state = useAppSelector((state) => state.TaskEditModal.state);

  const action = useAppAction();
  const dispatch = useAppDispatch();
  const closeModalSignal = () => {
    dispatch(action.TaskEditModal.toggleDrawerOpen(false));
  };

  const renderModalBody = () => {
    switch (state) {
      case 'success':
        return <SuccessModalBody />;
      case 'loading':
        return <LoadingModalBody />;
      case 'error':
        return <ErrorModalBody />;
      case 'idle':
        return <></>;
    }
  };

  const renderModalFooter = () => {
    switch (state) {
      case 'loading':
        return <></>;
      case 'success':
        return <SuccessModalFooter closeSignal={closeModalSignal} />;
      case 'error':
        return <ErrorModalFooter closeSignal={closeModalSignal} />;
      case 'idle':
        return <></>;
    }
  };

  return (
    <>
      <ModalBody className="TaskEditModal__Body">{renderModalBody()}</ModalBody>
      <ModalFooter className="TaskEditModal__Footer">
        {renderModalFooter()}
      </ModalFooter>
    </>
  );
});

function SuccessModalBody() {
  return (
    <>
      <div className="TaskEditModal__SuccessIcon">
        <CheckCircleOutlineIcon />
      </div>
      <span className="TaskEditModal__Message --Success">Success</span>
    </>
  );
}

type ModalFooterProps = {
  closeSignal: () => void;
};

function SuccessModalFooter(props: ModalFooterProps) {
  const { closeSignal } = props;
  return (
    <>
      <Button
        className="TaskEditModal__ReturnButton"
        onClick={closeSignal}
        type="outlined"
        variant="success"
      >
        Return to App
      </Button>
    </>
  );
}

function LoadingModalBody() {
  return (
    <>
      <LoadingSpinnerV2 className="TaskEditModal__Spinner" variant="primary" />
      <span className="TaskEditModal__Message --Loading">Loading...</span>
    </>
  );
}

function ErrorModalBody() {
  return (
    <>
      <div className="TaskEditModal__ErrorIcon">
        <ErrorOutlineIcon />
      </div>
      <span className="TaskEditModal__Message --Error">Error!</span>
    </>
  );
}

function ErrorModalFooter(props: ModalFooterProps) {
  const { closeSignal } = props;
  return (
    <>
      <Button className="TaskEditModal__SubmitButton" onClick={closeSignal}>
        Return to app
      </Button>
      <Button className="TaskEditModal__CloseButton" onClick={closeSignal}>
        Retry
      </Button>
    </>
  );
}
