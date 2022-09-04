import { ComponentStory, ComponentMeta } from '@storybook/react';
import { range } from 'd3';
import { TabPanel } from './TabPanel';
import { TabContainer } from './Tabs';

export default {
  component: TabContainer,
  title: 'my-component/TabContainer',
} as ComponentMeta<typeof TabContainer>;

const renderTab = (number: number) => {
  return range(0, number).map((e, i) => {
    return (
      <TabPanel
        key={i}
        TabContent={<p>Tab Content is {e}</p>}
        TabTrigger={`Tab ${e}`}
      />
    );
  });
};

const Template: ComponentStory<typeof TabContainer> = (args) => (
  <TabContainer {...args}>{renderTab(30)}</TabContainer>
);

export const Primary = Template.bind({});
Primary.args = {};
