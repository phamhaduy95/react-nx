import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DateTimePicker } from './DateTimePicker';

export default {
  component: DateTimePicker,
  title: 'my-component/DateTimePicker',
  argTypes: {
    onSelect: { action: 'onSelect executed!' },
    DatePanel: { action: 'DatePanel executed!' },
  },
} as ComponentMeta<typeof DateTimePicker>;

export const Primary: ComponentStory<typeof DateTimePicker> = (args) => {
  const { className, isSecondIncluded, label, dateFormat, timeDelimiters } =
    args;

  return (
    <DateTimePicker
      className={className}
      isSecondIncluded={isSecondIncluded}
      label={label}
      dateFormat={dateFormat}
      timeDelimiters={timeDelimiters}
    />
  );
};

Primary.args = {
  className: '',
  dateFormat: 'DD/MM/YYYY',
  isSecondIncluded: false,
  label: '',
  timeDelimiters: ':',
};
