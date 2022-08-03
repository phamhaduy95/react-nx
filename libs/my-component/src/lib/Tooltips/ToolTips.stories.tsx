import { ComponentStory, ComponentMeta } from '@storybook/react';
import  ToolTips  from './ToolTips';
import style from "./Tooltips.stories.module.scss"

export default {
  component: ToolTips,
  title: 'ToolTips',
} as ComponentMeta<typeof ToolTips>;

const Template: ComponentStory<typeof ToolTips> = (args) => (
  <ToolTips {...args} />
);

export const Example = Template.bind({});
Example.args = {
    children:<div className={style["child"]}>Hover Me</div>,
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

