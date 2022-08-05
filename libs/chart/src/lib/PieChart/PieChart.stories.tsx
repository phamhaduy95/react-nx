import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import  PieChart  from './PieChart';

export default {
  component: PieChart,
  title: 'PieChart',
} as ComponentMeta<typeof PieChart>;


export const Example :ComponentStory<typeof PieChart> = (args)=>{
  return (
    <PieChart {...args}/>
  )
}

Example.args = {
  dataSet:[{key:"agriculture",value:200},{key:"industry",value:400},{key:"services",value:600}],
  heightInPixel:400,
  widthInPixel:400,  
}
