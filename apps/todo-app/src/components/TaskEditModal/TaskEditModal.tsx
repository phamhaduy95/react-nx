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
import { convertTaskReduxDataIntoTaskDataInput } from './redux/utils';
import { useMemo } from 'react';
import { appApi, ReduxCategoryData } from '../../redux/appApi';

export function TaskEditDrawer() {
  const dispatch = useAppDispatch();
  const reduxTaskData = useAppSelector(
    (state) => state.taskEditModal.taskData
  );
  const type = useAppSelector((state) => state.taskEditModal.type);
  const [updateTask, updateResult] = appApi.useUpdateTaskMutation();
  const [addTask, addResult] = appApi.useAddTaskMutation();

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
          addTask(reduxTaskData).unwrap();

          break;
        case 'update':
          updateTask(reduxTaskData);
          break;
      }
      dispatch(action.taskEditModal.toggleDrawerOpen(false));
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

  const handleDrawerToggle: ModalProps['onToggle'] = (isOpen) => {
    dispatch(action.taskEditModal.toggleDrawerOpen(isOpen));
  };

  const handlePopupOpen = (isOpen: boolean, mode: any) => {
    dispatch(action.taskEditModal.setRestrictClose(isOpen));
  };

  console.log('restrict', restrictClose);
  const clickOutSide = !restrictClose;

  const headerContext = type === 'update' ? 'Update Task' : 'Add Task';

  return (
    <Modal
      isOpen={isOpen}
      className="TaskEditModal"
      onToggle={handleDrawerToggle}
      clickOutsideToClose={clickOutSide}
    >
      <ModalHeader className="TaskEditModal__Header">
        <span>{headerContext}</span>
      </ModalHeader>
      <ModalBody className="TaskEditModal__Body">
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
          error={{ start: errorsMessage.startTime, end: errorsMessage.endTime }}
          onPopupToggle={handlePopupOpen}
        />
      </ModalBody>
      <ModalFooter className="TaskEditModal__Footer">
        <button
          className="TaskEditModal__SubmitButton"
          onClick={handleFormSubmit}
        >
          Submit
        </button>
        <button className="TaskEditModal__ClearButton" onClick={handleClear}>
          Clear
        </button>
      </ModalFooter>
    </Modal>
  );
}
