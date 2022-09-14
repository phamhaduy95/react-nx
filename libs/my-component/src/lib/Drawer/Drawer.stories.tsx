import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import { Drawer } from './Drawer';
import { DrawerHeader } from './DrawerHeader';
import { DrawerContent } from './DrawerContent';

export default {
  component: Drawer,
  title: 'my-component/Drawer',
} as ComponentMeta<typeof Drawer>;

const Template: ComponentStory<typeof Drawer> = (args) => <Drawer {...args} />;

export const Primary: ComponentStory<typeof Drawer> = (args) => {
  const { position, forceMouth } = args;
  const [isOpen, setOpen] = useState(false);
  const handleClickToOpenDrawers = () => {
    setOpen(true);
  };
  const handleDrawerToggle = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <div>
      <button onClick={handleClickToOpenDrawers}>Open Drawer</button>
      <Drawer
        isOpen={isOpen}
        position={position}
        onToggle={handleDrawerToggle}
        forceMouth={forceMouth}
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
  );
};

Primary.args = {
  position: 'right',
  forceMouth: false,
};
