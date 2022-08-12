import { ComponentStory, ComponentMeta } from '@storybook/react';
import  ToolTips  from './ToolTips';
import "./Tooltips.stories.scss"

export default {
  component: ToolTips,
  title: 'my-component/ToolTips',
} as ComponentMeta<typeof ToolTips>;

const Template: ComponentStory<typeof ToolTips> = (args) => (
  <ToolTips {...args} />
);

export const Example = Template.bind({});
Example.args = {
    children:<div className={".child"}>Hover Me</div>,
    text:"tooltips",
    placement:"bottomCenter",
    trigger:"hover",
    padding:10,
};

Example.decorators = [
  (Story)=>{
    return (
      <div style={{margin:"2rem auto",width:"90%"}}>
        <Story/>
      </div>
    )
  }
]

