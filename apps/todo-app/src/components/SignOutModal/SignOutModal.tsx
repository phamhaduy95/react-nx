import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@phduylib/my-component';
import React, { useCallback, useEffect } from 'react';
import { useAppAction, useAppDispatch, useAppSelector } from '../../redux';
import './SignOutModal.scss';
import CloseIcon from '@mui/icons-material/Close';
import { appApi } from '../../redux/appApi/appApi';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '../../../../../libs/my-component/src/lib/Button/IconButton';

export function SignOutModal() {
  const action = useAppAction();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.SignOutModal.isOpen);
  const [signOut, result] = appApi.useSignOutMutation();

  const handleModalOpen = useCallback((isOpen: boolean) => {
    dispatch(action.SignOutModal.toggleOpen(isOpen));
  }, []);

  const handleCloseModal = () => {
    dispatch(action.SignOutModal.toggleOpen(false));
  };

  const handleSignOut = async () => {
    await signOut(undefined);
  };

  useEffect(() => {
    if (result.isSuccess) {
      dispatch(action.SignOutModal.toggleOpen(false));
      result.reset();
      navigate('/login');
    }
  }, [result]);

  return (
    <Modal className="SignOutModal" isOpen={isOpen} onToggle={handleModalOpen}>
      <ModalHeader>
        <p className="SignOutModal__Title">Sign Out</p>
        <IconButton
          className="SignOutModal__CloseIcon"
          onClick={handleCloseModal}
          variant="secondary"
        >
          <CloseIcon />
        </IconButton>
      </ModalHeader>
      <ModalBody>
        <p className="SignOutModal__Message">Do you want to sign out?</p>
      </ModalBody>
      <ModalFooter>
        <Button className="SignOutModal__SubmitButton" onClick={handleSignOut}>
          Sign Out
        </Button>
        <Button
          className="SignOutModal__CancelButton"
          onClick={handleCloseModal}
          type="outlined"
        >
          Continue
        </Button>
      </ModalFooter>
    </Modal>
  );
}
