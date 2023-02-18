import { Modal } from '@phduylib/my-component';
import React, { useCallback, useEffect } from 'react';
import { useAppAction, useAppDispatch, useAppSelector } from '../../redux';
import { ModalType } from '../../type/model';
import "./AppModal.scss";
import { useRegisterAllMutationResultToAppModal } from './hooks';

type RegisterModal = {
  type: ModalType;
  modal: JSX.Element;
};

export type AppModalProps = {
  registerModalsList: RegisterModal[];
};

export function AppModal(props: AppModalProps) {
  const { registerModalsList } = props;

  const action = useAppAction();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.AppModal.isOpen);
  const chosenModalType = useAppSelector((state) => state.AppModal.modalType);

  const handleModalToggle = useCallback((isOpen: boolean) => {
    if (isOpen === false) {
      dispatch(action.AppModal.closeModal());
    }
  }, []);

  const enableCloseOnClickOutside = useAppSelector(
    (state) => state.AppModal.closeOnClickOutside
  );

  useRegisterAllMutationResultToAppModal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      switch (key) {
        case 'Escape': {
          dispatch(action.AppModal.closeModal());
          return;
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  function renderModalContent() {

    const targetModalToBeRendered = registerModalsList.find(
      (modal) => modal.type === chosenModalType
    );
    return targetModalToBeRendered !== undefined ? (
      targetModalToBeRendered.modal
    ) : (
      <></>
    );
  }

  return (
    <Modal
      className="AppModal"
      isOpen={isOpen}
      onToggle={handleModalToggle}
      clickOutsideToClose={enableCloseOnClickOutside}
    >
      {renderModalContent()}
    </Modal>
  );
}
