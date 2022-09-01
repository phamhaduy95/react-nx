import { ComponentStory, ComponentMeta } from '@storybook/react';
import {Accordion}  from './Accordion';
import {AccordionItem} from './AccordionItem';

export default {
  component: Accordion,
  title: 'my-component/Accordion',
  subcomponents:{AccordionItem}
} as ComponentMeta<typeof Accordion>;

const message = " Lorem ipsum dolor sit amet consectetur adipisicing elit. Error harum in sit quam ea sequi, deserunt obcaecati hic repudiandae! Magnam, explicabo debitis temporibus nostrum minus optio molestias inventore libero quaerat!";

export const Example:ComponentStory<typeof Accordion> = (args)=>{
  return (
  <Accordion {...args} >
        <AccordionItem
          header="Item 1"
          content={<p>{message}</p>
          }
        />
        <AccordionItem
        header="Item 2"
        content={<p>{message}</p>}
        />
        <AccordionItem
          header="Item 3"
          content={<p>{message}</p>}
        />
      </Accordion>
  )
};

Example.args = {
  isAlwaysOpen:false,
}