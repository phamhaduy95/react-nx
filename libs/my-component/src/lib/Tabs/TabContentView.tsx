import { useTabStore } from './TabStoreProvider';

type TabContextViewProps = {
    TabContents:React.ReactNode[];
}

export function TabContentView(props:TabContextViewProps) {
  const {TabContents} = props;
  const selectedID = useTabStore((state)=>(state.selectedTab.index));
  const TabContext = TabContents[selectedID]  
  

  return (
    <div className='Tabs__ContentView'>
        {TabContext}
    </div>
  )
}

