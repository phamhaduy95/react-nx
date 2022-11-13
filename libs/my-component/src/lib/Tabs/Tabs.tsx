import React, { useMemo } from 'react';
import { TabContentView } from './TabContentView';
import { pickTabContentAndTabTriggerArrayFromChildren } from './TabPanel';
import { TabStoreProvider } from './TabStoreProvider';
import './Tabs.scss';
import { TabList } from './TabList';
import { GlobalStyleProvider } from '../GlobalStyleProvider';

type TabContainerProps = {
  className?: string;
  children: JSX.Element[] | JSX.Element;
};

export function TabContainer(props: TabContainerProps) {
  return (
    <GlobalStyleProvider>
      <TabStoreProvider>
        <WrappedTabContainer {...props} />
      </TabStoreProvider>
    </GlobalStyleProvider>
  );
}

function WrappedTabContainer(props: TabContainerProps) {
  const { children } = props;
  const { TabContentArray, TabTriggerArray } = useMemo(() => {
    return pickTabContentAndTabTriggerArrayFromChildren(children);
  }, [children]);

  return (
    <div className="Tabs__Container">
      <TabList>{TabTriggerArray}</TabList>
      <TabContentView TabContents={TabContentArray} />
    </div>
  );
}
