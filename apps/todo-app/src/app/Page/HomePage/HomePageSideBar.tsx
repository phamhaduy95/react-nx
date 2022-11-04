import { SideBarItem, SideBar, SideBarItemList } from '@phduylib/my-component';
import { memo, useCallback } from 'react';
import { NavItems } from './HomePage';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useLocation } from 'react-router-dom';


type HomePageSideBarProps = {
  onselectNavItem: (value: string) => void;
  onselectLogOut: () => void;
};
export const HomPageSideBar = memo((props: HomePageSideBarProps) => {
  const { onselectLogOut, onselectNavItem } = props;
 
  let location = useLocation();

  const renderSideBarItem = useCallback(() => {
    return NavItems().map((item, index) => {
      const { value, Icon } = item;
      const isSelected =
        location.pathname.split('/')[1] === value.toLowerCase();
      return (
        <SideBarItem
          value={value}
          label={value}
          Icon={Icon}
          onSelected={onselectNavItem}
          key={`sidebar-item-${index}`}
          isSelected={isSelected}
        />
      );
    });
  }, [location.pathname, onselectNavItem]);

  return (
    <SideBar
      className="HomePage__SideBar"
      BranchIcon={<></>}
      BranchText={'CalendarApp'}
    >
      <SideBarItemList divider>{renderSideBarItem()}</SideBarItemList>
      <SideBarItemList>
        <SideBarItem
          value="log out"
          label="log out"
          Icon={<LogoutOutlinedIcon />}
          type="button"
          onSelected={onselectLogOut}
        ></SideBarItem>
      </SideBarItemList>
    </SideBar>
  );
});
