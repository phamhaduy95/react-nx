import { useRef } from 'react';
import { DropDownMenu } from './DropDownMenu';
import { useStore } from 'zustand';
import {
  DropDownStoreProvider,
  useDropDownStore,
} from './DropDownStoreProvider';
import './DropDown.scss';


export type DropDownProps = {
  children: JSX.Element | JSX.Element[];
  className?: string;
};

const DropDownDefaultProps: Required<DropDownProps> = {
  className: '',
  children: <></>,
};
export function DropDown(props: DropDownProps) {
  return (
    <DropDownStoreProvider>
      <WrappedDropDown {...props} />
    </DropDownStoreProvider>
  );
}

function WrappedDropDown(props: DropDownProps) {
  const newProps = { ...DropDownDefaultProps, ...props };
  const { children, className } = newProps;
  const ref = useRef<HTMLDivElement>(null);
  const store = useDropDownStore();
  const action = useStore(store, (state) => state.action);

  const handleClickToOpenPopup = () => {
    action.togglePopup(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    const keyPressed = e.key;
    switch (keyPressed) {
      case 'ArrowDown': {
        e.preventDefault();
        action.togglePopup(true);
        action.hightLightFirstItem();
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
    <div
      className="DropDown"
      tabIndex={0}
      ref={ref}
      onKeyDown={handleKeyPress}
    >
      <div className="DropDown__Trigger" onClick={handleClickToOpenPopup}>
        ItemsList
      </div>
      <DropDownMenu targetRef={ref}>{children}</DropDownMenu>
    </div>
  );
}
