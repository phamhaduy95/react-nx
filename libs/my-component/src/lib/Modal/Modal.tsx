import React, { useEffect, useRef } from 'react';
import ModalBody from './ModalBody';
import ModalFooter, { DefaultFooter } from './ModalFooter';
import ModalHeader from './ModalHeader';
import ClickOutSideWatcher from '../ClickOutsideWatcher/ClickOutSideWatcher';
import ReactDOM from 'react-dom';
import ModalState from './ModalState';
import './Modal.scss';
import ModalContextProvider, { useModalContext } from './ModalContextProvider';
// ToDo: reimplement Modal using React Portal.
export type ModalProps = {
  className?: string;
  isOpen: boolean;
  draggable?: boolean;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  body?: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
  timeToExpire?: number;
};

const defaultPropsValue: Required<ModalProps> = {
  className: 'Modal--default',
  isOpen: false,
  draggable: false,
  footer: <DefaultFooter />,
  header: 'Modal header',
  body: <>Modal body</>,
  onClose: () => {},
  onOpen: () => {},
  timeToExpire: 0,
};

function WrappedModal(props: ModalProps) {
  const newProps = { ...defaultPropsValue, ...props };
  const {
    className,
    isOpen,
    footer,
    header,
    body,
    onClose,
    onOpen,
    timeToExpire,
  } = newProps;
  // provide default value incase no user input for these properties

  const { state, action } = useModalContext();
  const ref = useRef(null);

  // make Modal open when the outside signal isOpen is on.
  useEffect(() => {
    if (isOpen) action.openModal();
  }, [isOpen]);

  useEffect(() => {
    if (state.isOpen) {
      onOpen();
    } else {
      onClose();
    }
  }, [state.isOpen]);

  // set automatic turn-off feature when time is expired
  useEffect(() => {
    if (timeToExpire === 0 || timeToExpire === undefined) return;
    if (state.isOpen) {
      setTimeout(() => {
        action.closeModal();
      }, timeToExpire);
    }
  }, [state.isOpen, timeToExpire]);

  const handleClickOutSide = () => {
    action.closeModal();
  };

  const makeOpen = () => {
    if (state.isOpen) return 'open';
    return '';
  };

  return (
    <div className={`Modal ${className} ${makeOpen()}`}>
      <ClickOutSideWatcher ref={ref} onClickOutSide={handleClickOutSide}>
        <div className="Modal__Content" ref={ref}>
          <ModalHeader>{header}</ModalHeader>
          <ModalBody>{body}</ModalBody>
          <ModalFooter>{footer}</ModalFooter>
        </div>
      </ClickOutSideWatcher>
    </div>
  );
}

export default function Modal(props: ModalProps) {
  const { draggable, isOpen } = props;
  const initialState: ModalState = {
    draggable: draggable ?? false,
    isOpen: isOpen,
  };
  return ReactDOM.createPortal(
    <ModalContextProvider initialState={initialState}>
      <WrappedModal {...props}></WrappedModal>
    </ModalContextProvider>,
    document.body
  );
}
