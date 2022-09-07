import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import { useDropDownStore } from './DropDownStoreProvider';
import { useSwitchFocus } from '../utils/hooks';
import { ensureElementsListAsArray } from '../utils/ReactElementProcessor';

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

export function DropDownItem(props: DropDownItemProps) {
  return <></>;
}

type IndexedDropDownItemProps = DropDownItemProps & { index: number };

const IndexedDropDownItem = (props: IndexedDropDownItemProps) => {
  const newProps = { ...defaultProps, ...props };
  const { className, suffix, prefix, children, onSelect, index } = newProps;
  const itemRef = useRef<HTMLDivElement>(null);
  const action = useDropDownStore((state) => state.action);
  useEffect(() => {
    action.subscribe(index);
    return () => {
      action.unsubscribe(index);
    };
  }, []);

  const isHighLighted = useDropDownStore((state)=>{
    return state.highLightedItem?.index === index
  })

  useSwitchFocus(itemRef,isHighLighted)



  const itemClassName = classNames('DropDown__Item', 
    className,);


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
    action.togglePopup(false);
  };

  const handleMouseEnter = () => {
    action.hightLightItem({ index });
  };
  const handleMouseLeave = () => {
    action.hightLightItem(null);
  };

  const handleKeyPressed = (e: React.KeyboardEvent) => {
    e.preventDefault();
    const key = e.key;
    switch (key) {
      case 'Enter': {
        onSelect();
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyPressed}
    >
      {renderPrefix()}
      <div className="DropDown__Item__Content">{children}</div>
      {renderSuffix()}
    </div>
  );
};

export function giveIndexToDropDownItem(children: JSX.Element[] | JSX.Element) {
  const childrenArray = ensureElementsListAsArray(children);
  return childrenArray
    .filter((e) => e.type.name === DropDownItem.name)
    .map((e, i) => {
      const props = e.props;
      const newProps = { ...props, index: i };
      return <IndexedDropDownItem {...newProps} key={i} />;
    });
}
