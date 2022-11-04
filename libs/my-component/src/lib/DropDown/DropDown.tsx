import { useRef } from 'react';
import { DropDownMenu } from './DropDownMenu';
import {
  DropDownStoreProvider,
  useDropDownStore,
} from './DropDownStoreProvider';
import './DropDown.scss';
import { reDefineMenuItem } from '../PopupMenu/PopupMenuItem';
import { GlobalStyleProvider } from '../GlobalStyleProvider';
import { Placement } from '../Popup/types';
import classNames from 'classnames';

export type DropDownProps = {
  children: JSX.Element | JSX.Element[];
  className?: string;
  triggerEL: React.ReactNode;
  popupPlacement?: Placement;
  onPopupToggle?: (isOpen: boolean) => void;
};

const DropDownDefaultProps: Required<
  Omit<DropDownProps, 'children' | 'triggerEl'>
> = {
  className: '',
  triggerEL: <></>,
  popupPlacement: 'bottom-right',
  onPopupToggle(isOpen) {},
};
export function DropDown(props: DropDownProps) {
  return (
    <GlobalStyleProvider>
      <DropDownStoreProvider>
        <WrappedDropDown {...props} />
      </DropDownStoreProvider>
    </GlobalStyleProvider>
  );
}

function WrappedDropDown(props: DropDownProps) {
  const newProps = { ...DropDownDefaultProps, ...props };
  const { children, className, triggerEL, onPopupToggle, popupPlacement } =
    newProps;
  const triggerRef = useRef<HTMLDivElement>(null);
  const action = useDropDownStore((state) => state.action);
  const Items = reDefineMenuItem(children);

  const rootClassName = classNames('DropDown', className);
  const handleClickToOpenPopup = () => {
    action.togglePopup(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    const keyPressed = e.key;
    switch (keyPressed) {
      case 'ArrowDown': {
        e.preventDefault();
        action.togglePopup(true);
        action.highlightNext();
        return;
      }
      case 'Enter': {
        action.togglePopup(true);
        return;
      }
      case 'Escape': {
        action.togglePopup(false);
        return;
      }
    }
  };

  return (
    <div className={rootClassName}>
      <div
        className="DropDown__Trigger"
        onClick={handleClickToOpenPopup}
        tabIndex={0}
        onKeyDown={handleKeyPress}
        ref={triggerRef}
      >
        {triggerEL}
      </div>
      <DropDownMenu
        triggerRef={triggerRef}
        onPopupToggle={onPopupToggle}
        placement={popupPlacement}
      >
        {Items}
      </DropDownMenu>
    </div>
  );
}
