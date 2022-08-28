import { ComponentStory, ComponentMeta } from '@storybook/react';
import dayjs from 'dayjs';
import { CountDown } from './CountDown';

export default {
  component: CountDown,
  title: 'my-component/CountDown',
  argTypes: {
    onPause: { action: 'onPause executed!' },
    onChange: { action: 'onChange executed!' },
  },
} as ComponentMeta<typeof CountDown>;

export const Primary: ComponentStory<typeof CountDown> = (args)=>{
  return (
    <CountDown {...args}/>
  )
}
Primary.args = {
  className: '',
  deadline: 300,
  timeInterval: 1000,
  title: '',
  valueFormat:(value) => {
    const baseTime = dayjs().hour(0).minute(0).second(0);
    return baseTime.add(value,"second").format("HH:mm:ss");
  },
  onChange:(value)=>{console.log(value)},
  onFinish:()=>console.log("finished")
};
