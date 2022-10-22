import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  SideBarItem,
  SideBarItemList,
  SideBarItemProps,
  SideBarSubList,
} from '@phduylib/my-component';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SideBar } from './SideBar';
import { SideBarSubListItem } from './SideBarSubListItem';
import { useCallback } from 'react';

export default {
  component: SideBar,
  title: 'my-component/SideBar',
  subcomponents: { SideBarSubList, SideBarItemList, SideBarItem },
} as ComponentMeta<typeof SideBar>;

const Template: ComponentStory<typeof SideBar> = (args) => (
  <SideBar {...args} />
);

const items: SideBarItemProps[] = [
  {
    Icon: <HomeIcon />,
    label: 'Home',
    value: 'Home',
  },
  {
    Icon: <CalendarTodayIcon />,
    label: 'Calendar',
    value: 'Calendar',
  },
  {
    Icon: <SettingsIcon />,
    label: 'Setting',
    value: 'Setting',
  },
];

const Branch = {
  Icon: <HomeIcon />,
  Text: 'MyHome',
};

const SubList = {
  headerText: 'More...',
  headerIcon: <HomeIcon />,
  items: ['option1', 'option2', 'option3'],
};

export const Example: ComponentStory<typeof SideBar> = (args) => {
  const { BranchIcon, BranchText } = args;
  const handleSelectItem = useCallback((value: string) => {
    console.log(value);
  }, []);
  const renderSideBarItems = () => {
    return items.map((item, index) => {
      const { Icon, label, value } = item;
      return (
        <SideBarItem
          Icon={Icon}
          label={label}
          value={value}
          key={index}
          onSelected={handleSelectItem}
        />
      );
    });
  };

  return (
    <SideBar BranchIcon={BranchIcon} BranchText={BranchText}>
      <SideBarItemList subHeader="section 1">
        <>
          {renderSideBarItems()}
          <SideBarSubList
            headerText={'More...'}
            headerIcon={SubList.headerIcon}
          >
            <SideBarSubListItem label="subItem 1" value="subItem 1" />
            <SideBarSubListItem label="subItem 2" value="subItem 2" disabled />
            <SideBarSubListItem label="subItem 3" value="subItem 3" />
            <SideBarSubListItem label="subItem 4" value="subItem 4" />
          </SideBarSubList>
        </>
      </SideBarItemList>
      <SideBarItemList subHeader="section 2">
        {renderSideBarItems()}
      </SideBarItemList>
    </SideBar>
  );
};

Example.args = {
  BranchIcon: Branch.Icon,
  BranchText: Branch.Text,
};
