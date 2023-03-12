import {
  Button,
  LoadingButton,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@phduylib/my-component';
import { useCallback, useEffect } from 'react';
import { useAppAction, useAppDispatch, useAppSelector } from '../../redux';
import './SignOutModal.scss';
import CloseIcon from '@mui/icons-material/Close';
import { appApi } from '../../redux/appApi/appApi';
import { IconButton } from '../../../../../libs/my-component/src/lib/Button/IconButton';
import { useNavigate } from 'react-router-dom';

export function SignOutModal() {
  const action = useAppAction();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.SignOutModal.isOpen);
  const [signOut, result] = appApi.useSignOutMutation();
  const navigate = useNavigate();

  const handleModalOpen = useCallback((isOpen: boolean) => {
    dispatch(action.SignOutModal.toggleOpen(isOpen));
  }, []);

  const handleCloseModal = () => {
    dispatch(action.SignOutModal.toggleOpen(false));
  };

  const handleSignOut = () => {
    signOut(undefined)

  
  };

  useEffect(()=>{
    if (result.isSuccess){
      dispatch(action.SignOutModal.toggleOpen(false));
      result.reset();
      navigate("/login");
    }

  },[result.isSuccess])
  

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
        <LoadingButton
          onClick={handleSignOut}
          isLoading={result.isLoading}
          className="SignOutModal__SubmitButton"
        >
          Sign Out
        </LoadingButton>
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
