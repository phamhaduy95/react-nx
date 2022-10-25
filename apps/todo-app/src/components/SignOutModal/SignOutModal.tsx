import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@phduylib/my-component';
import React, { useCallback } from 'react';
import { useAppAction, useAppDispatch, useAppSelector } from '../../redux';
import './SignOutModal.scss';
import CloseIcon from '@mui/icons-material/Close';
import { appApi } from '../../redux/appApi/appApi';
import { useNavigate } from 'react-router-dom';

export function SignOutModal() {
  const action = useAppAction();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.SignOutModal.isOpen);
  const [signOut] = appApi.useSignOutMutation();

  const handleModalOpen = useCallback((isOpen: boolean) => {
    dispatch(action.SignOutModal.toggleOpen(isOpen));
  }, []);

  const handleCloseModal = () => {
    dispatch(action.SignOutModal.toggleOpen(false));
  };

  const handleSignOut = async () => {
    const result = await signOut(undefined);
    dispatch(action.SignOutModal.toggleOpen(false));
    navigate('/login');
  };

  return (
    <Modal
      className="SignOutModal"
      isOpen={isOpen}
      onToggle={handleModalOpen}
      closeIcon={<CloseIcon />}
    >
      <ModalHeader>
        <p className="SignOutModal__Title">Sign Out</p>
      </ModalHeader>
      <ModalBody>
        <p className="SignOutModal__Message">Do you want to sign out?</p>
      </ModalBody>
      <ModalFooter>
        <button className="SignOutModal__SubmitButton" onClick={handleSignOut}>
          Sign Out
        </button>
        <button
          className="SignOutModal__CancelButton"
          onClick={handleCloseModal}
        >
          Continue
        </button>
      </ModalFooter>
    </Modal>
  );
}
