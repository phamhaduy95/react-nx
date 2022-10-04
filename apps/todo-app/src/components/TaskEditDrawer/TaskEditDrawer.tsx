import {
  DateTimeRangePicker,
  DateTimeRangePickerProps,
  Drawer,
  Select,
  SelectOption,
  SelectProps,
  TextField,
  TextFieldProps,
} from '@phduylib/my-component';
import './TaskEditDrawer.scss';
import { validateInputData } from './TaskDataSchema';
import {
  TaskEditDrawerStoreProvider,
  useTaskEditDrawerStore,
} from './TaskEditDrawerStore';
import { compareTwoTaskData } from './utils';
import shallow from 'zustand/shallow';
import { TaskDataInput } from './types';

const options = ['Business', 'Family', 'Personal', 'ETC', 'Holiday'];

const defaultTaskData: TaskDataInput = Object.freeze({
  id: '',
  title: '',
  category: '',
  description: '',
  endDate: null,
  startDate: null,
});

export function TaskEditDrawer() {
  return (
    <TaskEditDrawerStoreProvider>
      <WrappedElement />
    </TaskEditDrawerStoreProvider>
  );
}

function WrappedElement() {
  const action = useTaskEditDrawerStore((state) => state.action);
  const taskData = useTaskEditDrawerStore(
    (state) => state.taskData,
    compareTwoTaskData
  );
  const errorsMessage = useTaskEditDrawerStore(
    (state) => state.errorMessages,
    shallow
  );

  const handleTitleInputChange: TextFieldProps['onValueChange'] = (value) => {
    action.updateTaskData({ title: value });
  };

  const handleCategoryChange: SelectProps['onSelect'] = (value) => {
    action.updateTaskData({ category: value });
  };

  const handleStartDateChange: DateTimeRangePickerProps['onStartTimeChange'] = (
    date
  ) => {
    action.updateTaskData({ startDate: date });
  };

  const handleEndDateChange: DateTimeRangePickerProps['onStartTimeChange'] = (
    date
  ) => {
    action.updateTaskData({ endDate: date });
  };

  const handleFormSubmit = async () => {
    const { result, error } = await validateInputData(taskData);
    if (result) {
      console.log('success');
      return;
    }
    action.updateErrorMessages(error);
  };
  const handleClear = () => {
    action.updateTaskData(defaultTaskData);
    action.clearErrorMessages();
  };

  const renderSelectOptions: () => JSX.Element[] = () => {
    return options.map((option, i) => {
      return <SelectOption key={i} value={option} label={option} />;
    });
  };

  return (
    <Drawer isOpen position="right" className="TaskEditDrawer">
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
        error={{start:errorsMessage.startDate,end:errorsMessage.endDate}}
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
