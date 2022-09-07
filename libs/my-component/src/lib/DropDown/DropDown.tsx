import { useRef } from 'react';
import { DropDownMenu } from './DropDownMenu';
import {
  DropDownStoreProvider,
  useDropDownStore,
} from './DropDownStoreProvider';
import './DropDown.scss';
import { giveIndexToDropDownItem } from './DropDownItem';

export type DropDownProps = {
  children: JSX.Element | JSX.Element[];
  className?: string;
  label:string;
};

const DropDownDefaultProps: Required<DropDownProps> = {
  className: '',
  children: <></>,
  label:"",
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
  const { children, className,label } = newProps;
  const ref = useRef<HTMLDivElement>(null);
  const action = useDropDownStore((state) => state.action);
  const IndexedDropDownItems = giveIndexToDropDownItem(children)

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
    <div className="DropDown" >
      <div
        className="DropDown__Trigger"
        onClick={handleClickToOpenPopup}
        tabIndex={0}
        onKeyDown={handleKeyPress}
        ref={ref}
      >
        {label}
      </div>
      <DropDownMenu targetRef={ref}>{IndexedDropDownItems}</DropDownMenu>
    </div>
  );
}
