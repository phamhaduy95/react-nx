import {
  ModalHeader,
  Modal,
  ModalBody,
  ModalProps,
  TextField,
} from '@phduylib/my-component';
import React from 'react';
import { useAppAction, useAppDispatch, useAppSelector } from '../../redux';
import CloseIcon from '@mui/icons-material/Close';

export function AddCategoryModal() {
  const action = useAppAction();
  const isOpen = useAppSelector((state) => state.AddCategoryModal.isOpen);
  const dispatch = useAppDispatch();

  const handleModalOpen: NonNullable<ModalProps['onToggle']> = (isOpen) => {
    dispatch(action.AddCategoryModal.toggleOpen(isOpen));
  };

  return (
    <Modal
      className="AddCategoryModal"
      isOpen={isOpen}
      onToggle={handleModalOpen}
      closeIcon={<CloseIcon />}
    >
      <ModalHeader>
        <p className="AddCategoryModal__Title">Add New Category</p>
      </ModalHeader>
      <ModalBody className="AddCategoryModal__Body">
        <TextField
          className="AddCategoryModal__NameInput"
          label="categoryName"
        />
      </ModalBody>
    </Modal>
  );
}
