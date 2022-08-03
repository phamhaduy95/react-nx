import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../Button/Button';
import  Modal  from './Modal';

export default {
  component: Modal,
  title: 'my-component/Modal',
} as ComponentMeta<typeof Modal>;


export const Example : ComponentStory<typeof Modal> = (args)=>{
  const [isModalOpen, setModalOpen] = useState(false);
  const handleClick = () => {
    setModalOpen((prev) => !prev);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };  
  return (
      <div style={{ margin: "1em auto 1em 1em",padding: "0.5em 1em",}}>
      <Button variant="primary" onClick={handleClick}>
        Open Modal
      </Button>
       <Modal {...args} isOpen={isModalOpen} onClose={handleModalClose}/>
      </div>
    )
}



