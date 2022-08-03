import { ComponentStory, ComponentMeta } from '@storybook/react';
import Accordion  from './Accordion';
import AccordionItem from './AccordionItem';

export default {
  component: Accordion,
  title: 'my-component/Accordion',
  subcomponents:{AccordionItem}
} as ComponentMeta<typeof Accordion>;



export const Example:ComponentStory<typeof Accordion> = (args)=>{
  return (
  <Accordion {...args} >
        <AccordionItem
          header={() => {
            return <>Item 1</>;
          }}
          content={() => {
            return <p>This is the content of item1</p>;
          }}
        />
        <AccordionItem
          header={() => {
            return <>Item 2</>;
          }}
          content={() => {
            return <p>This is the content of item 2</p>;
          }}
        />
        <AccordionItem
          header={() => {
            return <>Item 3</>;
          }}
          content={() => {
            return <p>This is the content of item 3</p>;
          }}
        />
      </Accordion>
  )
};

Example.args = {
  isAlwaysOpen:false,
}