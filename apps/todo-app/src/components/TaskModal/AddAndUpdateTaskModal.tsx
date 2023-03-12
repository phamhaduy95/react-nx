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
  ToolTips,
} from '@phduylib/my-component';
import { useAppDispatch, useAppAction, useAppSelector } from '../../redux';
import CloseIcon from '@mui/icons-material/Close';
import { appApi } from '../../redux/appApi';
import { shallowEqual } from 'react-redux';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { convertTaskReduxDataIntoTaskDataInput } from './utils';
import './TaskModal.scss';
import { ModalType } from '../../type/model';
import { validateTaskData } from '../../validation';

export function AddAndUpdateTaskModal() {
  const dispatch = useAppDispatch();
  const action = useAppAction();

  const errorsMessage = useAppSelector(
    (state) => state.TaskEditModal.errorMessages,
    shallowEqual
  );
  const reduxTaskData = useAppSelector((state) => state.TaskEditModal.taskData);
  const type = useAppSelector((state) => state.TaskEditModal.type);

  const [updateTask] = appApi.useUpdateTaskMutation({
    fixedCacheKey: 'shared',
  });
  const [addTask] = appApi.useAddTaskMutation({ fixedCacheKey: 'shared' });

  const { data: categories } = appApi.useGetAllForUserQuery(undefined, {});

  const taskData = useMemo(
    () => convertTaskReduxDataIntoTaskDataInput(reduxTaskData),
    [reduxTaskData]
  );

  const handleUserCloseModal = () => {
    dispatch(action.AppModal.closeModal());
  };

  const handleTitleInputChange: TextFieldProps['onValueChange'] = (value) => {
    dispatch(action.TaskEditModal.updateTaskData({ title: value }));
  };

  const handleCategoryInputChange: SelectProps['onSelect'] = (value) => {
    dispatch(action.TaskEditModal.updateTaskData({ categoryId: value }));
  };

  const handleStartDateInputChange: DateTimeRangePickerProps['onStartTimeChange'] =
    (date) => {
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
    const { result, errors } = await validateTaskData(taskData);
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

    dispatch(action.TaskEditModal.updateErrorMessage(errors));
  };
  const handleClearButtonClick = () => {
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
    <ToolTips
      enterDelay={100}
      leaveDelay={100}
      placement="bottom-center"
      text="delete task"
    >
      <IconButton
        className="TaskEditModal__DeleteTaskButton"
        onClick={handleDeleteButtonClick}
        variant="secondary"
      >
        <DeleteForeverIcon />
      </IconButton>
    </ToolTips>
  );

  const renderSelectOptions: () => JSX.Element[] = () => {
    if (categories === undefined) return [];
    const optionElements = categories.map((category, i) => {
      return (
        <SelectOption
          key={i}
          value={category.categoryId}
          label={category.name}
        />
      );
    });
    optionElements.push(
      <SelectOption value="null" key={'null-category'} label="no category" />
    );
    return optionElements;
  };

  function renderModalTitle() {
    switch (type) {
      case 'update':
        return 'Update Task';
      case 'add':
        return 'Add Task';
    }
  }

  return (
    <>
      <ModalHeader className="AppModal__Header">
        <span className="AppModal__Title">{renderModalTitle()}</span>
        <div className="AppModal__HeaderControl">
          {DeleteTaskButton}
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
          onSelect={handleCategoryInputChange}
          defaultValue={taskData.categoryId}
          error={errorsMessage.categoryId}
        >
          {renderSelectOptions()}
        </Select>
        <DateTimeRangePicker
          className="AppModal__DateTimeRange"
          onStartTimeChange={handleStartDateInputChange}
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
          onClick={handleClearButtonClick}
          type="outlined"
        >
          Clear
        </Button>
      </ModalFooter>
    </>
  );
}
