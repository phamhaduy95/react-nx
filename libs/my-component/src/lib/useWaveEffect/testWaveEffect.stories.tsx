import { ComponentStory, ComponentMeta } from '@storybook/react';
import  TestWaveEffect  from './TestWaveEffect';

export default {
  component: TestWaveEffect,
  title: 'my component/hooks/useWaveEffect',
} as ComponentMeta<typeof TestWaveEffect>;

const Template: ComponentStory<typeof TestWaveEffect> = (args) => (
  <TestWaveEffect {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
