import {
  DateTimeRangePicker,
  DateTimeRangePickerProps,
  Drawer,
  DrawerHeader,
  DrawerHeaderProps,
  DrawerProps,
  Select,
  SelectOption,
  SelectProps,
  TextField,
  TextFieldProps,
} from '@phduylib/my-component';
import './TaskEditDrawer.scss';
import { shallowEqual } from 'react-redux';
import {
  useAppAction,
  useAppDispatch,
  useAppSelector,
} from '../../redux/rootStore';
import { validateInputData } from './TaskDataSchema';
import { convertTaskReduxDataIntoTaskDataInput } from './redux/utils';
import { useMemo } from 'react';

const options = ['Business', 'Family', 'Personal', 'ETC', 'Holiday'];

export function TaskEditDrawer() {
  const dispatch = useAppDispatch();
  const reduxTaskData = useAppSelector(
    (state) => state.taskEditDrawer.taskData
  );

  const type = useAppSelector((state) => state.taskEditDrawer.type);

  const taskData = useMemo(
    () => convertTaskReduxDataIntoTaskDataInput(reduxTaskData),
    [reduxTaskData]
  );

  const errorsMessage = useAppSelector(
    (state) => state.taskEditDrawer.errorMessages,
    shallowEqual
  );

  const isOpen = useAppSelector((state) => state.taskEditDrawer.isOpen);
  const action = useAppAction();

  const handleTitleInputChange: TextFieldProps['onValueChange'] = (value) => {
    dispatch(action.taskEditDrawer.updateTaskData({ title: value }));
  };

  const handleCategoryChange: SelectProps['onSelect'] = (value) => {
    dispatch(action.taskEditDrawer.updateTaskData({ categoryId: value }));
  };

  const handleStartDateChange: DateTimeRangePickerProps['onStartTimeChange'] = (
    date
  ) => {
    const dateStr = date === null ? '' : date.toString();
    dispatch(action.taskEditDrawer.updateTaskData({ startTime: dateStr }));
  };

  const handleEndDateChange: DateTimeRangePickerProps['onStartTimeChange'] = (
    date
  ) => {
    const dateStr = date === null ? '' : date.toString();
    dispatch(action.taskEditDrawer.updateTaskData({ endTime: dateStr }));
  };

  const handleFormSubmit = async () => {
    const { result, error } = await validateInputData(taskData);
    if (result) {
      console.log('success');
      return;
    }
    dispatch(action.taskEditDrawer.updateErrorMessage(error));
  };
  const handleClear = () => {
    dispatch(action.taskEditDrawer.clearErrorMessage());
    dispatch(action.taskEditDrawer.clearTaskData());
  };

  const renderSelectOptions: () => JSX.Element[] = () => {
    return options.map((option, i) => {
      return <SelectOption key={i} value={option} label={option} />;
    });
  };

  const handleDrawerToggle: DrawerProps['onToggle'] = (isOpen) => {
    dispatch(action.taskEditDrawer.toggleDrawerOpen(isOpen));
  };

  const headerContext = type === 'update' ? 'Update Task' : 'Add Task';

  return (
    <Drawer
      isOpen={isOpen}
      position="right"
      className="TaskEditDrawer"
      onToggle={handleDrawerToggle}
    >
      <DrawerHeader className="TextEditDrawer__Header" closeIcon>
        <span>{headerContext}</span>
      </DrawerHeader>
      <TextField
        className="TextEditDrawer__TitleInput"
        label="title:"
        onValueChange={handleTitleInputChange}
        value={taskData.title}
        error={errorsMessage.title}
      />
      <Select
        className="TextEditDrawer__CategorySelect"
        label="category:"
        autoWidth
        onSelect={handleCategoryChange}
        defaultValue={taskData.categoryId}
        error={errorsMessage.category}
      >
        {renderSelectOptions()}
      </Select>
      <DateTimeRangePicker
        className="TextEditDrawer__DateTimeRange"
        onStartTimeChange={handleStartDateChange}
        onEndTimeChange={handleEndDateChange}
        startDate={taskData.startTime}
        endDate={taskData.endTime}
        label={{ start: 'start time:', end: 'end time:' }}
        error={{ start: errorsMessage.startTime, end: errorsMessage.endTime }}
      />
      <div className="TextEditDrawer__ActionBox">
        <button
          className="TextEditDrawer__SubmitButton"
          onClick={handleFormSubmit}
        >
          Submit
        </button>
        <button className="TextEditDrawer__ClearButton" onClick={handleClear}>
          Clear
        </button>
      </div>
    </Drawer>
  );
}
