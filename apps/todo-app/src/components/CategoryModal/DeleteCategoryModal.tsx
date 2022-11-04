import {
  Button,
  IconButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@phduylib/my-component';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { ModalType, useAppAction, useAppDispatch } from '../../redux';
import { appApi } from '../../redux/appApi/appApi';
import { useAppSelector } from '../../redux/rootStore';

export function DeleteCategoryModal() {
  const action = useAppAction();
  const dispatch = useAppDispatch();
  const categoryId = useAppSelector(
    (state) => state.DeleteCategoryModal.taskToDelete
  );

  const [deleteCategory] = appApi.useDeleteCategoryMutation({
    fixedCacheKey: 'shared-delete-category',
  });

  const closeModalSignal = () => {
    dispatch(action.AppModal.closeModal());
  };

  const handleCancelClick = () => {
    dispatch(action.AppModal.openModal(ModalType.manageCategories));
  };

  const handleSubmitClick = async () => {
    await deleteCategory(categoryId); 
  };

  return (
    <>
      <ModalHeader className="AppModal__Header">
        <span className="AppModal__Title">Delete Category</span>
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
      <ModalBody className="AppModal__Body">
        Do you want to delete this category permanently?
      </ModalBody>
      <ModalFooter className="AppModal__Footer">
        <Button className="AppModal__SubmitButton" onClick={handleSubmitClick}>
          Delete
        </Button>
        <Button
          className="AppModal__CancelButton"
          onClick={handleCancelClick}
          type="outlined"
        >
          Cancel
        </Button>
      </ModalFooter>
    </>
  );
}
