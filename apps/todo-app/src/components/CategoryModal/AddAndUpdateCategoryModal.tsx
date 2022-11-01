import {
  ModalHeader,
  ModalBody,
  TextField,
  ModalFooter,
  Button,
  IconButton,
} from '@phduylib/my-component';
import { useAppAction, useAppDispatch, useAppSelector } from '../../redux';
import CloseIcon from '@mui/icons-material/Close';
import { shallowEqual } from 'react-redux';
import { useCallback } from 'react';
import { validateCategoryData } from './categoryDataValidation';
import './CategoryModal.scss';

export function AddAndUpdateCategoryModal() {
  const action = useAppAction();
  const dispatch = useAppDispatch();
  const categoryData = useAppSelector(
    (state) => state.AddCategoryModal.data,
    shallowEqual
  );
  const errorMessages = useAppSelector(
    (state) => state.AddCategoryModal.errorMessage,
    shallowEqual
  );

  const closeModalSignal = () => {
    dispatch(action.AppModal.closeModal());
  };

  const handleNameInputChange = useCallback((value: string) => {
    dispatch(action.AddCategoryModal.updateCategoryData({ name: value }));
  }, []);

  const handleColorInputChange = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    dispatch(action.AddCategoryModal.updateCategoryData({ color: value }));
  };

  const handleDescriptionInputChange = (e: React.FormEvent) => {
    const target = e.target as HTMLTextAreaElement;
    const value = target.value;
    dispatch(
      action.AddCategoryModal.updateCategoryData({ description: value })
    );
  };
  const handleClickToClear = () => {
    dispatch(action.AddCategoryModal.clearCategoryData());
    dispatch(action.AddCategoryModal.clearErrorMessage());
  };

  const handleSubmit = async () => {
    const { result, error } = await validateCategoryData(categoryData);
    if (result) {
    }
  };

  return (
    <>
      <ModalHeader className="AppModal__Header">
        <span className="AppModal__Title">Add Category</span>
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
        <TextField
          className="AppModal__NameInput"
          label="categoryName"
          onValueChange={handleNameInputChange}
        />
        <div className="AppModal__ColorPicker">
          <label className="AppModal__Label">color</label>
          <input
            className="AppModal__ColorInput"
            type="color"
            value={categoryData.color}
            onChange={handleColorInputChange}
          />
        </div>
        <div className="AppModal__Description">
          <label className="AppModal__Label">description</label>
          <textarea
            className="AppModal__TextArea"
            value={categoryData.description}
            onChange={handleDescriptionInputChange}
          />
        </div>
      </ModalBody>
      <ModalFooter className="AppModal__Footer">
        <Button className="AppModal__SubmitButton" onClick={handleSubmit}>
          Add
        </Button>
        <Button
          className="AppModal__CancelButton"
          onClick={handleClickToClear}
          type="outlined"
        >
          Clear
        </Button>
      </ModalFooter>
    </>
  );
}
