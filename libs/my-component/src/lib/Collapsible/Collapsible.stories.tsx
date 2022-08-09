import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import { Collapsible } from './Collapsible';


export default {
  component: Collapsible,
  title: 'my-component/Collapsible',
} as ComponentMeta<typeof Collapsible>;

const Template: ComponentStory<typeof Collapsible> = (args) => (
  <Collapsible {...args} />
);

export const Example: ComponentStory<typeof Collapsible> = (args) => {
  const [open,setOpen] = useState(false);
  const handleClick = (e:React.MouseEvent)=>{
    setOpen(prev=>!prev);
  }
  const {direction} = args;

  return (
    <>
      <button onClick={handleClick}>Show collapsible area</button>
      <Collapsible direction={direction} showed={open}>
            <span></span>
      </Collapsible>
    </>
  ) 
};

Example.args = {
  direction:"vertical"
}

