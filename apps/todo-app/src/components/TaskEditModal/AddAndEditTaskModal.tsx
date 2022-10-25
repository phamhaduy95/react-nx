import {
  DateTimeRangePicker,
  DateTimeRangePickerProps,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Select,
  SelectOption,
  SelectProps,
  TextField,
  TextFieldProps,
} from '@phduylib/my-component';
import { useCallback, useMemo } from 'react';
import { shallowEqual } from 'react-redux';
import { useAppAction, useAppDispatch, useAppSelector } from '../../redux';
import { appApi } from '../../redux/appApi';
import { validateInputData } from './TaskDataSchema';
import { convertTaskReduxDataIntoTaskDataInput } from './utils';

export function AddAndEditTaskModal() {
  const dispatch = useAppDispatch();
  const action = useAppAction();

  const reduxTaskData = useAppSelector((state) => state.taskEditModal.taskData);
  const type = useAppSelector((state) => state.taskEditModal.type);
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
    (state) => state.taskEditModal.errorMessages,
    shallowEqual
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

  const handlePopupOpen = useCallback((isOpen: boolean, mode: any) => {
    dispatch(action.taskEditModal.setRestrictClose(isOpen));
  }, []);

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
  return (
    <>
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
      </ModalBody>
      <ModalFooter className="TaskEditModal__Footer">
        <button
          className="TaskEditModal__SubmitButton"
          onClick={handleFormSubmit}
        >
          {type === 'update' ? 'Update' : 'Add'}
        </button>
        <button className="TaskEditModal__ClearButton" onClick={handleClear}>
          Clear
        </button>
      </ModalFooter>
    </>
  );
}
