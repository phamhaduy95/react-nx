import { IconButton, ModalBody, ModalHeader } from '@phduylib/my-component';
import React, { useEffect } from 'react';
import { useAppAction, useAppDispatch } from '../../redux';
import CloseIcon from '@mui/icons-material/Close';
import { CategoryFilterBox } from '../CategoryFilterBox/CategoryFilterBox';
import "./CategoryFilterModal.scss";
export default function CategoryFilterModal() {
  const action = useAppAction();
  const dispatch = useAppDispatch();
  const closeModalSignal = () => {
    dispatch(action.AppModal.closeModal());
  };

  return (
    <>
      <ModalHeader className="AppModal__Header">
        <span className="AppModal__Title">Categories</span>
        <div className="AppModal__HeaderControl">
          <IconButton
            className="AppModal__CloseButton"
            onClick={closeModalSignal}
            variant="secondary"
          >
            <CloseIcon />
          </IconButton>
        </div>
      </ModalHeader>
      <ModalBody className="CategoryFilterModal__Body">
        <CategoryFilterBox />
      </ModalBody>
    </>
  );
}
