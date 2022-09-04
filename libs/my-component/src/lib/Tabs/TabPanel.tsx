import React from 'react';
import { ensureElementsListAsArray } from '../utils/ReactElementProcessor';
import { TabTrigger } from './TabTrigger';

type TabPanelProps = {
  onSelect?: (index: number) => void;
  TabTrigger: React.ReactNode;
  TabContent: React.ReactNode;
  isDefault?: boolean;
  disabled?: boolean;
};

export function TabPanel(props: TabPanelProps) {
  return <></>;
}

export function pickTabContentAndTabTriggerArrayFromChildren(
  children: JSX.Element[] | JSX.Element
) {
  const childrenArray = ensureElementsListAsArray(children);
  const TabPanelArray = childrenArray.filter(
    (e) => e.type.name === TabPanel.name
  );
  const TabContentArray: React.ReactNode[] = [];
  const TabTriggerArray: React.ReactNode[] = [];
  TabPanelArray.forEach((e, i) => {
    const props = e.props as TabPanelProps;
    const { isDefault, onSelect } = props;
    TabContentArray.push(props.TabContent);
    const TabTriggerComponent = (
      <TabTrigger key={i} isDefault={isDefault} index={i} onSelect={undefined}>
        {props.TabTrigger}
      </TabTrigger>
    );
    TabTriggerArray.push(TabTriggerComponent);
  });

  return { TabContentArray, TabTriggerArray };
}
