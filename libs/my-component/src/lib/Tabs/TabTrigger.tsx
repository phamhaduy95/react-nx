import { useTabStore } from './TabStoreProvider';
import classNames from 'classnames';
import { useEffect, useRef } from 'react';

type TabTriggerProps = {
  index: number;
  children: React.ReactNode;
  isDefault?: boolean;
  onSelect?: (index: number) => void;
};

const defaultProps: Required<TabTriggerProps> = {
  index: 0,
  children: <></>,
  isDefault: false,
  onSelect() {},
};

export function TabTrigger(props: TabTriggerProps) {
  const newProps = { ...defaultProps, ...props };
  const { children, index } = newProps;
  const isDefault = props.isDefault === undefined ? false : props.isDefault;
  const onSelect =
    props.onSelect === undefined ? defaultProps.onSelect : props.onSelect;

  const ref = useRef<HTMLDivElement>(null);  
  const action = useTabStore((state) => state.action);
  const isSelected = useTabStore((state) => state.selectedTab.index === index);
  const isHightLighted = useTabStore((state)=>state.highlightedTab?.index === index);
  useEffect(() => {
    action.subscribe();
    return () => {
      action.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isDefault) action.selectTab(index);
  }, [isDefault]);

  useEffect(()=>{
    if (!isHightLighted) return;
    const el = ref.current;
    if (el === null) return;
    el.focus();
    el.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest' });
  },[isHightLighted])

  const className = classNames('Tabs__Trigger', {
    ['is-selected']: isSelected,
  });

  const handleClickToSelect = (e: React.MouseEvent) => {
    onSelect(index);
    action.selectTab(index);
    const el = e.target as HTMLElement;
    el.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    const key = e.key;
    switch (key) {
      case 'Enter': {
        onSelect(index);
        action.selectTab(index);
        return;
      }
      case "ArrowRight":{
        e.preventDefault();
        action.highlightNextTab();
        return;   
      }
      case "ArrowLeft": {
        e.preventDefault();
        action.highlightPrevTab();
        return;
      }
    }
  };

  const handleFocus = () => {
    action.highlightTab(index);
  };


  return (
    <div
      className={className}
      tabIndex={0}
      onClick={handleClickToSelect}
      onKeyDown={handleKeyPress}
      onFocus={handleFocus}
      ref={ref}
    >
      {children}
    </div>
  );
}
