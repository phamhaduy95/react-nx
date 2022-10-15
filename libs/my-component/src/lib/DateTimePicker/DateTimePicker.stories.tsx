import { ComponentStory, ComponentMeta } from '@storybook/react';
import GlobalStyleProvider from '../GlobalStyleProvider';
import { DateTimePicker } from './DateTimePicker';

export default {
  component: DateTimePicker,
  title: 'my-component/DateTimePicker',
  argTypes: {
    onSelect: { action: 'onSelect executed!' }
  },
} as ComponentMeta<typeof DateTimePicker>;

export const Primary: ComponentStory<typeof DateTimePicker> = (args) => {
  const { className, isSecondIncluded, label, dateFormat, timeDelimiters } =
    args;

  return (
    <GlobalStyleProvider>
    <DateTimePicker
      className={className}
      isSecondIncluded={isSecondIncluded}
      label={label}
      dateFormat={dateFormat}
      timeDelimiters={timeDelimiters}
    />
    </GlobalStyleProvider>
  );
};

Primary.args = {
  className: '',
  dateFormat: 'DD/MM/YYYY',
  isSecondIncluded: false,
  label: '',
  timeDelimiters: ':',
};
