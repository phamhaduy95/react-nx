import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import { Drawer } from './Drawer';
import { DrawerHeader } from './DrawerHeader';
import { DrawerContent } from './DrawerContent';
import { GlobalStyleProvider } from '../GlobalStyleProvider';
import { Button } from '../Button';

export default {
  component: Drawer,
  title: 'my-component/Drawer',
  subcomponents: {
    DrawerHeader,
    DrawerContent,
  },
  argTypes: {
    onToggle: { action: 'is toggled' },
  },
} as ComponentMeta<typeof Drawer>;

export const Primary: ComponentStory<typeof Drawer> = (args) => {
  const { position, forceMouth, closeOnClickOutSide } = args;
  const [isOpen, setOpen] = useState(false);
  const handleClickToOpenDrawers = () => {
    setOpen(true);
  };
  const handleDrawerToggle = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <GlobalStyleProvider>
      <div>
        <Button type="outlined" onClick={handleClickToOpenDrawers}>
          Open Drawer
        </Button>
        <Drawer
          isOpen={isOpen}
          position={position}
          onToggle={handleDrawerToggle}
          forceMouth={forceMouth}
          closeOnClickOutSide={closeOnClickOutSide}
        >
          <DrawerHeader closeIcon>
            <p>Welcome!</p>
          </DrawerHeader>
          <DrawerContent>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, ex
              doloribus! Dolores laborum qui ducimus fugiat suscipit dolorum
              quibusdam perspiciatis eveniet officiis, quod nesciunt cumque
              tenetur aperiam autem laudantium perferendis.
            </p>
          </DrawerContent>
        </Drawer>
      </div>
    </GlobalStyleProvider>
  );
};

Primary.args = {
  position: 'right',
  forceMouth: false,
  closeOnClickOutSide: true,
};
