import styled from '@emotion/styled';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useRef, useState } from 'react';
import { Popover } from './Popover';

export default {
  component: Popover,
  title: 'my-component/Popover',
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => (
  <Popover {...args} />
);

export const Primary: ComponentStory<typeof Popover> = (args) => {
  const {positionOrigin,forceMount,fixedOnScroll,placement} = args;
  const [isOpen, setOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const Container = styled('div')`
    margin-top: 0.5rem ;
    margin-right:10px;
    margin-left:auto;
    width: 10vw;
    height: 250px;
  `;

  const MyButton = styled('button')`
    padding: 0.5rem 0.75rem;
    border: 1px solid hsl(0, 0%, 90%);
    color: hsl(0, 0%, 20%);
  `;
  const MyPopover = styled(Popover)`
    display: flex;
    flex-direction: column;
    width: 250px;
    background-color:white;
    z-index:10;
    padding: 0.5rem;
    color: hsl(0, 0%, 20%);
    border: 1px solid hsl(0, 0%, 80%);
    > .Popover__Title {
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
      font-weight: 60;
    }
    > .Popover__Content {
      margin: 0;
      font-size: 0.85rem;
    }
  `;

  const handleClick = () => {
    setOpen(true);
  };

  const handleOpen = (isOpen: boolean) => {
    setOpen(isOpen);
  };
  return (
   
    <Container>
      <MyButton onClick={handleClick} ref={ref}>Open Popover</MyButton>
      <MyPopover
        isOpen={isOpen}
        positionOrigin={positionOrigin}
        anchorRef={ref}
        onOpen={handleOpen}
        fixedOnScroll={fixedOnScroll}
        forceMount={forceMount}
        placement={placement}
      >
          <>
          <div className="Popover__Title">OK</div>
          <p className="Popover__Content">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            cum reprehenderit id sequi aut ducimus, molestias ea accusantium
            eius repellat? Asperiores a saepe id illum libero consequuntur modi
            ipsum nostrum!
          </p>
          </>
      </MyPopover>
    </Container>
  );
};
Primary.args = {
  positionOrigin:{top:0,left:0},
  forceMount:false,
  fixedOnScroll:false,
  placement:"bottom-left",
};
