import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Select } from './Select';
import { SelectOption } from './SelectOption';
import { SelectSubHeader } from './SelectSubHeader';

export default {
  component: Select,
  title: 'my-component/Select',
  argTypes: {
    onSelect: { action: 'onSelect executed!' },
  },
  subcomponents:{SelectOption,SelectSubHeader}
} as ComponentMeta<typeof Select>;


export const Example: ComponentStory<typeof Select> =(args)=>{
   const {autoWidth,defaultValue,label} = args;
    return (
      <Select label={label} autoWidth={autoWidth} defaultValue={defaultValue}>
        <SelectSubHeader>Section1</SelectSubHeader>
        <SelectOption value={12} label={'12'}></SelectOption>
        <SelectOption value={40} label={'40'}></SelectOption>
        <SelectOption value={60000} label={'60000'}></SelectOption>
      </Select>
    )
}
Example.args = {
  autoWidth:true,
  defaultValue: "12",
  label:"choose",
};
