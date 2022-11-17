import styled from '@emotion/styled';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../Button';
import { Collapsible } from './Collapsible';

export default {
  component: Collapsible,
  title: 'my-component/Collapsible',
  argTypes: {
    onToggle: { actions: 'is showed' },
  },
} as ComponentMeta<typeof Collapsible>;

export const Example: ComponentStory<typeof Collapsible> = (args) => {
  const [open, setOpen] = useState(false);
  const handleClick = (e: React.MouseEvent) => {
    setOpen((prev) => !prev);
  };
  const { direction } = args;

  const Content = styled('div')`
    display: flex;
    justify-content: center;
    border: 1px solid hsl(0, 0%, 50%);
    align-items: center;
    width: max-content;
    padding: 1em;
    height: 5em;
    > span {
      font-size: 1.1em;
    }
  `;

  return (
    <>
      <Button onClick={handleClick}>Show collapsible area</Button>
      <Collapsible direction={direction} showed={open}>
        <Content>
          <span> This is collapsible area </span>
        </Content>
      </Collapsible>
    </>
  );
};

Example.decorators = [
  (Story) => {
    const Div = styled('div')`
      margin: 1em;
    `;

    return (
      <Div>
        <Story />
      </Div>
    );
  },
];

Example.args = {
  direction: 'vertical',
  showed: true,
};
