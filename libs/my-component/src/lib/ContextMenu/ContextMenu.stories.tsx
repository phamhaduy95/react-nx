import styled from '@emotion/styled';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useRef } from 'react';
import GlobalStyleProvider from '../GlobalStyleProvider';
import { ContextMenu } from './ContextMenu';
import { ContextMenuItem } from './ContextMenuItem';
import { ContextMenuItemGroup } from './ContextMenuItemGroup';

export default {
  component: ContextMenu,
  title: 'my-component/ContextMenu',
  subcomponents: { ContextMenuItem },
} as ComponentMeta<typeof ContextMenu>;

export const Example: ComponentStory<typeof ContextMenu> = (args) => {
  const { placement } = args;
  const targetRef = useRef<HTMLDivElement>(null);
  const Box = styled('div')`
    :root {
      box-sizing: border-box;
    }
    margin: 1rem auto;
    width: 200px;
    height: 400px;
    border: 2px dashed grey;
  `;
  return (
    <GlobalStyleProvider>
      <Box ref={targetRef}>
        <ContextMenu targetRef={targetRef} placement={placement}>
          <ContextMenuItem>Item 1</ContextMenuItem>
          <ContextMenuItem prefix={<>a</>} suffix={<>aa</>}>
            Item 2
          </ContextMenuItem>
          <ContextMenuItem disabled>Item 3</ContextMenuItem>
          <ContextMenuItem>Item 4</ContextMenuItem>
          <ContextMenuItemGroup label="group 1">
            <ContextMenuItem>Item 5</ContextMenuItem>
            <ContextMenuItem>Item 6</ContextMenuItem>
          </ContextMenuItemGroup>
        </ContextMenu>
      </Box>
    </GlobalStyleProvider>
  );
};

Example.args = {
  placement: 'bottom-right',
};
