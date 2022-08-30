import classNames from 'classnames';
import { memo, useEffect, useMemo, useRef } from 'react';
import { useStore } from 'zustand';
import { useDropDownStore } from './DropDownStoreProvider';
import { v4 as uuidv4 } from 'uuid';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';
import { useSwitchFocus } from './hooks';

export type DropDownItemProps = {
  className?: string;
  suffix?: JSX.Element | string | false;
  prefix?: JSX.Element | string | false;
  children: React.ReactNode;
  onSelect?: () => void;
};

const defaultProps: Required<DropDownItemProps> = {
  className: '',
  suffix: false,
  prefix: false,
  children: <></>,
  onSelect() {},
};
export const DropDownItem = (props: DropDownItemProps) => {
  const newProps = { ...defaultProps, ...props };
  const { className, suffix, prefix, children,onSelect } = newProps;
  const id = useMemo(() => {
    return uuidv4();
  }, []);
  const store = useDropDownStore();
  
  const action = useStore(store, (state) => state.action);
  useEffect(() => {
    action.subscribe(id);
    return () => {
      action.unsubscribe(id);
    };
  }, []);

  const isSelected = useStore(store, (state) => {
    return id === state.highLightedItem;
  });

  // console.log(id," rendered")

  const itemRef = useRef<HTMLDivElement>(null);


  const itemClassName = classNames('DropDown__Item', {
    className,
    ['is-selected']: isSelected,
  });

  useSwitchFocus(itemRef,isSelected)

  const renderSuffix = () => {
    if (suffix) return <div className="DropDown__Item__Suffix">{suffix}</div>;
    return <></>;
  };

  const renderPrefix = () => {
    if (prefix) return <div className="DropDown__Item__Prefix">{prefix}</div>;
    return <></>;
  };

  const handleClickItem = () => {
    onSelect();
  };

  const handleMouseEnter = ()=>{
    action.changeHighLightItem(id);
  }
  const handleMouseLeave = ()=>{
    action.changeHighLightItem(null)
  }

  const handleKeyPressed = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const key = e.key;
    switch (key) {
      case 'ArrowDown': {
         action.hightLightNextItem();
         return;
      }
      case "ArrowUp":{
        action.hightLightPreviousItem();
        return;
      }
      case "Enter":{
        onSelect();
        action.togglePopup(false);
        return;
      }
    }
  };
  return (
    <div
      className={itemClassName}
      tabIndex={-1}
      onClick={handleClickItem}
      ref={itemRef}
      onMouseEnter = {handleMouseEnter}
      onMouseLeave= {handleMouseLeave}
      onKeyDown={handleKeyPressed}
    >
      {renderPrefix()}
      <div className="DropDown__Item__Content">{children}</div>
      {renderSuffix()}
    </div>
  );
};
