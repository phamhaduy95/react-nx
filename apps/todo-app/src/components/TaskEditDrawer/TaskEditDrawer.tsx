import {
  DateTimeRangePicker,
  DateTimeRangePickerProps,
  Drawer,
  DrawerHeaderProps,
  DrawerProps,
  Select,
  SelectOption,
  SelectProps,
  TextField,
  TextFieldProps,
} from '@phduylib/my-component';
import './TaskEditDrawer.scss';
import { compareTwoTaskData } from './utils';
import { shallowEqual } from 'react-redux';
import {
  useAppAction,
  useAppDispatch,
  useAppSelector,
} from '../../redux/rootStore';
import { validateInputData } from './TaskDataSchema';

const options = ['Business', 'Family', 'Personal', 'ETC', 'Holiday'];

export function TaskEditDrawer() {
  const dispatch = useAppDispatch();
  const taskData = useAppSelector(
    (state) => state.taskEditDrawer.taskData,
    compareTwoTaskData
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
    dispatch(action.taskEditDrawer.updateTaskData({ category: value }));
  };

  const handleStartDateChange: DateTimeRangePickerProps['onStartTimeChange'] = (
    date
  ) => {
    dispatch(action.taskEditDrawer.updateTaskData({ startDate: date }));
  };

  const handleEndDateChange: DateTimeRangePickerProps['onStartTimeChange'] = (
    date
  ) => {
    dispatch(action.taskEditDrawer.updateTaskData({ endDate: date }));
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

  return (
    <Drawer
      isOpen={isOpen}
      position="right"
      className="TaskEditDrawer"
      onToggle={handleDrawerToggle}
    >
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
        defaultValue={taskData.category}
        error={errorsMessage.category}
      >
        {renderSelectOptions()}
      </Select>
      <DateTimeRangePicker
        className="TextEditDrawer__DateTimeRange"
        onStartTimeChange={handleStartDateChange}
        onEndTimeChange={handleEndDateChange}
        startDate={taskData.startDate}
        endDate={taskData.endDate}
        label={{ start: 'start time:', end: 'end time:' }}
        error={{ start: errorsMessage.startDate, end: errorsMessage.endDate }}
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
