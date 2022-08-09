import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SettingsIcon from '@mui/icons-material/Settings';
import { SideBarItem, SideBarItemList, SideBarItemProps, SideBarSubList } from '@phduylib/my-component';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SideBar } from './SideBar';

export default {
  component: SideBar,
  title: 'my-component/SideBar',
  subcomponents: {SideBarSubList,SideBarItemList,SideBarItem},
} as ComponentMeta<typeof SideBar>;

const Template: ComponentStory<typeof SideBar> = (args) => (
  <SideBar {...args} />
);

const items: SideBarItemProps[] = [
  {
    Icon: <HomeIcon />,
    Text: 'Home',
  },
  {
    Icon: <CalendarTodayIcon />,
    Text: 'Calendar',
  },
  {
    Icon: <SettingsIcon />,
    Text: 'Setting',
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
  const {BranchIcon,BranchText} = args;

  const renderSideBarItems = () => {
    return items.map((item, index) => {
      const { Icon, Text } = item;
      return <SideBarItem Icon={Icon} Text={Text} key={index} />;
    });
  };

  return (
    <SideBar BranchIcon={BranchIcon} BranchText={BranchText}>
      <SideBarItemList subHeader="section 1">
        <>
          {renderSideBarItems()}
          <SideBarSubList
            items={SubList.items}
            headerText={'More...'}
            headerIcon={SubList.headerIcon}
          />
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
  
}