import { ComponentStory, ComponentMeta } from '@storybook/react';
import {GlobalStyleProvider} from '../GlobalStyleProvider';
import { range } from '../utils/range';
import { ScrollableDataColumn } from './ScrollableDataColumn';

export default {
  component: ScrollableDataColumn,
  title: 'my-component/ScrollableDataColumn',
} as ComponentMeta<typeof ScrollableDataColumn>;

const Template: ComponentStory<typeof ScrollableDataColumn> = (args) => (
  <GlobalStyleProvider>
  <ScrollableDataColumn {...args} />
  </GlobalStyleProvider>
);

export const Primary = Template.bind({});

const getColumnData = ()=>{
  return range(0,15).map(e=>{
    return {
      value:e
    }
  })
}

Primary.args = {
  dataSet: getColumnData(),
  numberShowedItem:7
};
