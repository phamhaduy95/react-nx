import { ComponentStory, ComponentMeta } from '@storybook/react';
import  BarStackedChart  from './BarStackedChart';

export default {
  component: BarStackedChart,
  title: 'BarStackedChart',
} as ComponentMeta<typeof BarStackedChart>;

const Template: ComponentStory<typeof BarStackedChart> = (args) => (
  <BarStackedChart {...args} />
);

export const Example : ComponentStory<typeof BarStackedChart> = (args)=>(
  <BarStackedChart {...args}/>
);

Example.args = {
  dataSet:[
    { key: "January", valuesList:{ completed: 16, unfinished: 12, fail: 5 }},
    { key: "February",valuesList: {completed: 12, unfinished: 10,fail:5 }},
    { key: "March", valuesList: { completed: 8, unfinished: 10, fail: 0 }},
    { key: "April", valuesList: { completed: 0, unfinished: 3, fail: 1 }},
    { key: "june", valuesList: { completed: 10, unfinished: 0, fail: 0 }},
  ],
  settings:{
    height:450,
    width:450,
    padding:0.2,
    axis:{
      XLength:350,
      YLength:350,
      offsetLeft:30,
      offsetTop:30
    },
    legends:{
      position:"right"
    }
  }
}

