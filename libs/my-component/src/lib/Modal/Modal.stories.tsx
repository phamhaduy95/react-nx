import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Modal } from './Modal';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import CloseIcon from '@mui/icons-material/Close';
import { ModalFooter } from './ModalFooter';
import { GlobalStyleProvider } from '../GlobalStyleProvider';

export default {
  component: Modal,
  title: 'my-component/Modal',
} as ComponentMeta<typeof Modal>;

export const Example: ComponentStory<typeof Modal> = (args) => {
  const { forceMount } = args;
  const [isModalOpen, setModalOpen] = useState(false);
  const handleClick = () => {
    setModalOpen((prev) => !prev);
  };
  const handleModalToggle = (isOpen: boolean) => {
    setModalOpen(isOpen);
  };
  return (
    <GlobalStyleProvider>
      <div style={{ margin: '1em auto 1em 1em', padding: '0.5em 1em' }}>
        <Button variant="primary" onClick={handleClick}>
          Open Modal
        </Button>
        <Modal
          isOpen={isModalOpen}
          onToggle={handleModalToggle}
          forceMount={forceMount}
          closeIcon={<CloseIcon />}
        >
          <ModalHeader>
            <p>Welcome!</p>
          </ModalHeader>
          <ModalBody>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusamus, quis obcaecati neque dolorem voluptatem incidunt
              tempora ea provident repellat minus error in, libero distinctio
              ipsam voluptatibus laborum maxime sed repellendus.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              type="outlined"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </GlobalStyleProvider>
  );
};

Example.args = {
  forceMount: false,
};
