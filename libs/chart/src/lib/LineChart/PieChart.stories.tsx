import { ComponentStory, ComponentMeta } from '@storybook/react';
import  LineChart  from './LineChart';

export default {
  component: LineChart,
  title: 'Chart/LineChart',
} as ComponentMeta<typeof LineChart>;


export const Example :ComponentStory<typeof LineChart> = (args)=>{
  return (
    <LineChart {...args}/>
  )
}

Example.args = {
 dataset:{
  xRange: [new Date(2022,1,5), 24*60*60*1000],
  lines: [
    { key: "first", yValues: [2, 2.3, 4.2, 5.5, 6.2, 7.1, 7.8, 6,8,18] },
    { key: "second", yValues: [0.8, 2, 3.1, 3.2, 4, 3, 2.5, 3, 4.8,1] },
    { key: "third", yValues: [0.8, 2, 3.1, 3.2, 4, 3, 2.5, 3, 6,10] },
  ],
},
settings: {
  height: 500,
  width: 500,
  axis: {
    XLength: 450,
    YLength: 450,
    offsetX: 20,
    offsetY: 20,
  },
  grid: true,
  tickFormat: "%x",
}
}
