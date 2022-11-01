import { useRef } from 'react';
import { DropDownMenu } from './DropDownMenu';
import {
  DropDownStoreProvider,
  useDropDownStore,
} from './DropDownStoreProvider';
import './DropDown.scss';
import { reDefineMenuItem } from '../PopupMenu/PopupMenuItem';
import {GlobalStyleProvider} from '../GlobalStyleProvider';


export type DropDownProps = {
  children: JSX.Element | JSX.Element[];
  className?: string;
  label: string;
};

const DropDownDefaultProps: Required<DropDownProps> = {
  className: '',
  children: <></>,
  label: '',
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
  const { children, className, label } = newProps;
  const ref = useRef<HTMLDivElement>(null);
  const action = useDropDownStore((state) => state.action);
  const Items = reDefineMenuItem(children);
  const handleClickToOpenPopup = () => {
    action.togglePopup(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
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
    <div className="DropDown">
      <div
        className="DropDown__Trigger"
        onClick={handleClickToOpenPopup}
        tabIndex={0}
        onKeyDown={handleKeyPress}
        ref={ref}
      >
        {label}
      </div>
      <DropDownMenu targetRef={ref}>{Items}</DropDownMenu>
    </div>
  );
}
