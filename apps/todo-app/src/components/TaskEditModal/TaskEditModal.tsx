import {
  DateTimeRangePicker,
  DateTimeRangePickerProps,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalProps,
  Select,
  SelectOption,
  SelectProps,
  TextField,
  TextFieldProps,
} from '@phduylib/my-component';
import './TaskEditModal.scss';
import { shallowEqual } from 'react-redux';
import {
  useAppAction,
  useAppDispatch,
  useAppSelector,
} from '../../redux/rootStore';
import { validateInputData } from './TaskDataSchema';
import { useCallback, useEffect, useMemo } from 'react';
import { appApi } from '../../redux/appApi';
import { convertTaskReduxDataIntoTaskDataInput } from './utils';

export function TaskEditModal() {
  const dispatch = useAppDispatch();
  const reduxTaskData = useAppSelector((state) => state.taskEditModal.taskData);
  const type = useAppSelector((state) => state.taskEditModal.type);
  const [updateTask, updateResult] = appApi.useUpdateTaskMutation();
  const [addTask, addResult] = appApi.useAddTaskMutation();

  const isLoading =
    type === 'add' ? addResult.isLoading : updateResult.isLoading;
  const isError = type === 'add' ? addResult.isError : updateResult.isError;
  const isSuccess =
    type === 'add' ? addResult.isSuccess : updateResult.isSuccess;
  const isIdle = !(isLoading || isError || isSuccess);
  const { data: categories } = appApi.useGetAllForUserQuery(undefined, {});

  const taskData = useMemo(
    () => convertTaskReduxDataIntoTaskDataInput(reduxTaskData),
    [reduxTaskData]
  );

  const errorsMessage = useAppSelector(
    (state) => state.taskEditModal.errorMessages,
    shallowEqual
  );

  const isOpen = useAppSelector((state) => state.taskEditModal.isOpen);
  const action = useAppAction();
  const restrictClose = useAppSelector(
    (state) => state.taskEditModal.restrictClose
  );

  useEffect(() => {
    if (isOpen) {
      updateResult.reset();
      addResult.reset();
    }
  }, [isOpen]);

  const handleTitleInputChange: TextFieldProps['onValueChange'] = (value) => {
    dispatch(action.taskEditModal.updateTaskData({ title: value }));
  };

  const handleCategoryChange: SelectProps['onSelect'] = (value) => {
    dispatch(action.taskEditModal.updateTaskData({ categoryId: value }));
  };

  const handleStartDateChange: DateTimeRangePickerProps['onStartTimeChange'] = (
    date
  ) => {
    const dateStr = date === null ? '' : date.toISOString();
    dispatch(action.taskEditModal.updateTaskData({ startTime: dateStr }));
  };

  const handleEndDateChange: DateTimeRangePickerProps['onStartTimeChange'] = (
    date
  ) => {
    const dateStr = date === null ? '' : date.toISOString();
    dispatch(action.taskEditModal.updateTaskData({ endTime: dateStr }));
  };

  const handleFormSubmit = async () => {
    const { result, error } = await validateInputData(taskData);
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
    dispatch(action.taskEditModal.updateErrorMessage(error));
  };
  const handleClear = () => {
    dispatch(action.taskEditModal.clearErrorMessage());
    dispatch(action.taskEditModal.clearTaskData());
  };

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

  const handleDrawerToggle: ModalProps['onToggle'] = useCallback((isOpen) => {
    dispatch(action.taskEditModal.toggleDrawerOpen(isOpen));
  }, []);

  const handlePopupOpen = useCallback((isOpen: boolean, mode: any) => {
    dispatch(action.taskEditModal.setRestrictClose(isOpen));
  }, []);

  const closeModalSignal = () => {
    dispatch(action.taskEditModal.toggleDrawerOpen(false));
  };

  return (
    <Modal
      isOpen={isOpen}
      className="TaskEditModal"
      onToggle={handleDrawerToggle}
      clickOutsideToClose={!restrictClose}
    >
      <ModalHeader className="TaskEditModal__Header">
        <span>{type === 'update' ? 'Update Task' : 'Add Task'}</span>
      </ModalHeader>

      <ModalBody className="TaskEditModal__Body">
        {isIdle && (
          <>
            <TextField
              className="TaskEditModal__TitleInput"
              label="title:"
              onValueChange={handleTitleInputChange}
              value={taskData.title}
              error={errorsMessage.title}
            />
            <Select
              className="TaskEditModal__CategorySelect"
              label="category:"
              autoWidth
              onSelect={handleCategoryChange}
              defaultValue={taskData.categoryId}
              error={errorsMessage.categoryId}
              // onPopupToggle={handlePopupOpen}
            >
              {renderSelectOptions()}
            </Select>
            <DateTimeRangePicker
              className="TaskEditModal__DateTimeRange"
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
          </>
        )}
        {isLoading && <div className="LoadingMessage">Loading</div>}
        {isError && <div className="ErrorMessage">Error</div>}
        {isSuccess && <div className="">Success</div>}
      </ModalBody>
      <ModalFooter className="TaskEditModal__Footer">
        {isIdle && (
          <>
            <button
              className="TaskEditModal__SubmitButton"
              onClick={handleFormSubmit}
            >
              Submit
            </button>
            <button
              className="TaskEditModal__ClearButton"
              onClick={handleClear}
            >
              Clear
            </button>
          </>
        )}
        {isLoading && <></>}
        {isError && (
          <button
            className="TaskEditModal__CloseButton"
            onClick={closeModalSignal}
          >
            Close
          </button>
        )}
        {isSuccess && (
          <button
            className="TaskEditModal__CloseButton"
            onClick={closeModalSignal}
          >
            Continue
          </button>
        )}
      </ModalFooter>
    </Modal>
  );
}
