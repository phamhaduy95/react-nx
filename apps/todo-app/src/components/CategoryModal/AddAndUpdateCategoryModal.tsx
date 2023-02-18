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
import { appApi } from '../../redux/appApi/appApi';


export function AddAndUpdateCategoryModal() {
  const action = useAppAction();
  const dispatch = useAppDispatch();
  const categoryData = useAppSelector(
    (state) => state.AddAndUpdateCategoryModal.data,
    shallowEqual
  );
  const errorMessages = useAppSelector(
    (state) => state.AddAndUpdateCategoryModal.errorMessage,
    shallowEqual
  );

  const type = useAppSelector((state) => state.AddAndUpdateCategoryModal.type);

  const [addCategory] = appApi.useAddCategoryMutation({
    fixedCacheKey: 'shared',
  });
  const [updateCategory] = appApi.useUpdateCategoryMutation({
    fixedCacheKey: 'shared',
  });

  const handleNameInputChange = useCallback((value: string) => {
    dispatch(
      action.AddAndUpdateCategoryModal.updateCategoryData({ name: value })
    );
  }, []);

  const handleColorInputChange = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    dispatch(
      action.AddAndUpdateCategoryModal.updateCategoryData({ color: value })
    );
  };

  const handleDescriptionInputChange = (e: React.FormEvent) => {
    const target = e.target as HTMLTextAreaElement;
    const value = target.value;
    dispatch(
      action.AddAndUpdateCategoryModal.updateCategoryData({
        description: value,
      })
    );
  };

  const handleUserCloseModal = () => {
    dispatch(action.AppModal.closeModal());
  };

  const handleSubmit = async () => {
    const { result, error } = await validateCategoryData(categoryData);
    if (result) {
      switch (type) {
        case 'add':
          const { categoryId, ...data } = categoryData;
          await addCategory(data);
          break;
        case 'update':
          await updateCategory(categoryData);
          break;
      }
    }
    dispatch(action.AddAndUpdateCategoryModal.updateErrorMessage(error));
  };

  const handleClickToClear = () => {
    dispatch(action.AddAndUpdateCategoryModal.clearCategoryData());
    dispatch(action.AddAndUpdateCategoryModal.clearErrorMessage());
  };

  return (
    <>
      <ModalHeader className="AppModal__Header">
        <span className="AppModal__Title">
          {type === 'add' ? 'Add Category' : 'Update Category'}
        </span>
        <div className="AppModal__HeaderControl">
          <IconButton
            className="AppModal__CloseButton"
            onClick={handleUserCloseModal}
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
          value={categoryData.name}
          error={errorMessages.name}
        />
        <div className="AppModal__ColorPicker">
          <label className="AppModal__Label">color</label>
          <input
            className="AppModal__ColorInput"
            type="color"
            value={categoryData.color}
            onChange={handleColorInputChange}
          />
          <span className="AppModal__ErrorMessage">{errorMessages.color}</span>
        </div>
        <div className="AppModal__Description">
          <label className="AppModal__Label">description</label>
          <textarea
            className="AppModal__TextArea"
            value={categoryData.description}
            onChange={handleDescriptionInputChange}
          />
          <span className="AppModal__ErrorMessage">
            {errorMessages.description}
          </span>
        </div>
      </ModalBody>
      <ModalFooter className="AppModal__Footer">
        <Button className="AppModal__SubmitButton" onClick={handleSubmit}>
          {type === 'add' ? 'Add' : 'Update'}
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
