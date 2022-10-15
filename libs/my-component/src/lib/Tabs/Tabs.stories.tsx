import { ComponentStory, ComponentMeta } from '@storybook/react';
import { range } from 'd3';
import GlobalStyleProvider from '../GlobalStyleProvider';
import { TabPanel } from './TabPanel';
import { TabContainer } from './Tabs';

export default {
  component: TabContainer,
  title: 'my-component/TabContainer',
} as ComponentMeta<typeof TabContainer>;

const renderTab = (number: number) => {
  return range(0, number).map((e, i) => {
    return (
      <GlobalStyleProvider>
        <TabPanel
          key={i}
          TabContent={<p>Tab Content is {e}</p>}
          TabTrigger={`Tab ${e}`}
        />
      </GlobalStyleProvider>
    );
  });
};

const Template: ComponentStory<typeof TabContainer> = (args) => (
  <TabContainer {...args}>{renderTab(30)}</TabContainer>
);

export const Primary = Template.bind({});
Primary.args = {};
