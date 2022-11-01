import React, { useCallback, useMemo } from 'react';
import {
  Button,
  DateTimeRangePicker,
  DateTimeRangePickerProps,
  IconButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Select,
  SelectOption,
  SelectProps,
  TextField,
  TextFieldProps,
} from '@phduylib/my-component';
import {
  useAppDispatch,
  useAppAction,
  useAppSelector,
  ModalType,
} from '../../redux';
import CloseIcon from '@mui/icons-material/Close';
import { appApi } from '../../redux/appApi';
import { shallowEqual } from 'react-redux';
import { validateTaskData } from './TaskDataValidation';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { convertTaskReduxDataIntoTaskDataInput } from './utils';
import './TaskModal.scss';

export function AddAndUpdateTaskModal() {
  const dispatch = useAppDispatch();
  const action = useAppAction();
  const closeModalSignal = () => {
    dispatch(action.AppModal.closeModal());
  };
  const reduxTaskData = useAppSelector((state) => state.TaskEditModal.taskData);
  const type = useAppSelector((state) => state.TaskEditModal.type);

  const [updateTask] = appApi.useUpdateTaskMutation({
    fixedCacheKey: 'shared-update-task',
  });
  const [addTask] = appApi.useAddTaskMutation({
    fixedCacheKey: 'shared-add-task',
  });
  const { data: categories } = appApi.useGetAllForUserQuery(undefined, {});

  const taskData = useMemo(
    () => convertTaskReduxDataIntoTaskDataInput(reduxTaskData),
    [reduxTaskData]
  );

  const errorsMessage = useAppSelector(
    (state) => state.TaskEditModal.errorMessages,
    shallowEqual
  );

  const handleTitleInputChange: TextFieldProps['onValueChange'] = (value) => {
    dispatch(action.TaskEditModal.updateTaskData({ title: value }));
  };

  const handleCategoryChange: SelectProps['onSelect'] = (value) => {
    dispatch(action.TaskEditModal.updateTaskData({ categoryId: value }));
  };

  const handleStartDateChange: DateTimeRangePickerProps['onStartTimeChange'] = (
    date
  ) => {
    const dateStr = date === null ? '' : date.toISOString();
    dispatch(action.TaskEditModal.updateTaskData({ startTime: dateStr }));
  };

  const handleEndDateChange: DateTimeRangePickerProps['onStartTimeChange'] = (
    date
  ) => {
    const dateStr = date === null ? '' : date.toISOString();
    dispatch(action.TaskEditModal.updateTaskData({ endTime: dateStr }));
  };

  const handleFormSubmit = async () => {
    const { result, error } = await validateTaskData(taskData);
    if (result) {
      switch (type) {
        case 'add':
          addTask(reduxTaskData);
          break;
        case 'update':
          updateTask(reduxTaskData);
          break;
      }
      return;
    }
    dispatch(action.TaskEditModal.updateErrorMessage(error));
  };
  const handleClear = () => {
    dispatch(action.TaskEditModal.clearErrorMessage());
    dispatch(action.TaskEditModal.clearTaskData());
  };

  const handlePopupOpen = useCallback((isOpen: boolean) => {
    dispatch(action.AppModal.toggleCloseOnClickOutside(!isOpen));
  }, []);

  const handleDeleteButtonClick = () => {
    dispatch(action.AppModal.openModal(ModalType.deleteTask));
  };

  const DeleteTaskButton = type === 'update' && (
    <IconButton
      className="TaskEditModal__DeleteTaskButton"
      onClick={handleDeleteButtonClick}
      variant="secondary"
    >
      <DeleteForeverIcon />
    </IconButton>
  );

  const renderSelectOptions: () => JSX.Element[] = () => {
    if (categories === undefined) return [];
    return categories.map((category, i) => {
      return (
        <SelectOption
          key={i}
          value={category.categoryId}
          label={category.name}
        />
      );
    });
  };

  const renderTitle = () => {
    switch (type) {
      case 'update':
        return 'Update Task';
      case 'add':
        return 'Add Task';
    }
  };

  return (
    <>
      <ModalHeader className="AppModal__Header">
        <span className="AppModal__Title">{renderTitle()}</span>
        <div className="AppModal__HeaderControl">
          {DeleteTaskButton}
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
          className="AppModal__TitleInput"
          label="title:"
          onValueChange={handleTitleInputChange}
          value={taskData.title}
          error={errorsMessage.title}
        />
        <Select
          className="AppModal__CategorySelect"
          label="category:"
          autoWidth
          onSelect={handleCategoryChange}
          defaultValue={taskData.categoryId}
          error={errorsMessage.categoryId}
        >
          {renderSelectOptions()}
        </Select>
        <DateTimeRangePicker
          className="AppModal__DateTimeRange"
          onStartTimeChange={handleStartDateChange}
          onEndTimeChange={handleEndDateChange}
          startDate={taskData.startTime}
          endDate={taskData.endTime}
          label={{ start: 'start time:', end: 'end time:' }}
          error={{
            start: errorsMessage.startTime,
            end: errorsMessage.endTime,
          }}
          onPopupToggle={handlePopupOpen}
        />
      </ModalBody>
      <ModalFooter className="AppModal__Footer">
        <Button className="AppModal__SubmitButton" onClick={handleFormSubmit}>
          {type === 'update' ? 'Update' : 'Add'}
        </Button>
        <Button
          className="AppModal__ClearButton"
          onClick={handleClear}
          type="outlined"
        >
          Clear
        </Button>
      </ModalFooter>
    </>
  );
}
