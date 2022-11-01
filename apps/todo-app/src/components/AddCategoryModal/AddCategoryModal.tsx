import {
  ModalHeader,
  Modal,
  ModalBody,
  ModalProps,
  TextField,
  ModalFooter,
  Button,
  IconButton,
} from '@phduylib/my-component';
import { useAppAction, useAppDispatch, useAppSelector } from '../../redux';
import CloseIcon from '@mui/icons-material/Close';
import './AddCategoryModal.scss';

export function AddCategoryModal() {
  const action = useAppAction();
  const isOpen = useAppSelector((state) => state.AddCategoryModal.isOpen);
  const dispatch = useAppDispatch();

  const handleModalOpen: NonNullable<ModalProps['onToggle']> = (isOpen) => {
    dispatch(action.AddCategoryModal.toggleOpen(isOpen));
  };

  const closeModalSignal = () => {
    dispatch(action.AddCategoryModal.toggleOpen(false));
  };

  const handleClear = () => {};

  const handleSubmit = () => {};

  return (
    <Modal
      className="AddCategoryModal"
      isOpen={isOpen}
      onToggle={handleModalOpen}
    >
      <ModalHeader className="AddCategoryModal__Header">
        <span className="AddCategoryModal__Title">Add Category</span>

        <IconButton
          className="AddCategoryModal__CloseButton"
          onClick={closeModalSignal}
          variant="secondary"
        >
          <CloseIcon />
        </IconButton>
      </ModalHeader>
      <ModalBody className="AddCategoryModal__Body">
        <TextField
          className="AddCategoryModal__NameInput"
          label="categoryName"
        />
        <div className="AddCategoryModal__ColorPicker">
          <label className="AddCategoryModal__Label">color</label>
          <input className="AddCategoryModal__ColorInput" type="color" />
        </div>
        <div className="AddCategoryModal__Description">
          <label className="AddCategoryModal__Label">description</label>
          <textarea className="AddCategoryModal__TextArea" />
        </div>
      </ModalBody>
      <ModalFooter className="AddCategoryModal__Footer">
        <Button
          className="AddCategoryModal__SubmitButton"
          onClick={handleSubmit}
        >
          Add
        </Button>
        <Button
          className="AddCategoryModal__CancelButton"
          onClick={handleClear}
          type="outlined"
        >
          Clear
        </Button>
      </ModalFooter>
    </Modal>
  );
}
