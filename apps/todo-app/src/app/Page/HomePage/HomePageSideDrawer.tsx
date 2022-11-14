import { Drawer, IconButton, ToolTips } from '@phduylib/my-component';

import { memo, useCallback, useState } from 'react';
import { NavItems } from './HomePage';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useAppAction, useAppDispatch, useAppSelector } from '../../../redux';
import './HomePageSideDrawer.scss';
import { Close } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

type HomePageSideBarProps = {
  onselectNavItem: (value: string) => void;
  onselectLogOut: () => void;
};

export const HomePageSideDrawer = memo((props: HomePageSideBarProps) => {
  const { onselectLogOut, onselectNavItem } = props;
  const action = useAppAction();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isOpen = useAppSelector((state) => state.HomePage.isDrawerOpen);

  const handleSelectItem = useCallback((value: string) => {
    dispatch(action.HomePage.toggleDrawer(false));
    onselectNavItem(value);
  }, []);

  const renderNavItems = () => {
    return NavItems().map((item, index) => {
      const { value, Icon } = item;
      const isSelected =
        location.pathname.split('/')[1] === value.toLowerCase();
      return (
        <SideDrawerItem
          value={value}
          Icon={Icon}
          onSelect={handleSelectItem}
          key={`drawerItem-${index}`}
          isSelected={isSelected}
        />
      );
    });
  };

  const handleToggle = (isOpen: boolean) => {
    dispatch(action.HomePage.toggleDrawer(isOpen));
  };

  const handleSelectLogout = () => {
    dispatch(action.HomePage.toggleDrawer(false));
    onselectLogOut();
  };

  const handleCloseIconClick = () => {
    dispatch(action.HomePage.toggleDrawer(false));
  };

  return (
    <Drawer
      className="HomePage__SideDrawer"
      isOpen={isOpen}
      onToggle={handleToggle}
      position="left"
      closeOnClickOutSide={false}
    >
      <div className="SideDrawer__Header">
        <span className="SideDrawer__HeaderTitle">CalendarApp</span>
        <span className="SideDrawer__CloseIconContainer">
          <IconButton variant="secondary" onClick={handleCloseIconClick}>
            <Close />
          </IconButton>
        </span>
      </div>
      <div className="SideDrawer__Content">
        {renderNavItems()}
        <div className="SideDrawer__Divider" />
        <SideDrawerItem
          value={'Log out'}
          Icon={<LogoutOutlinedIcon />}
          onSelect={handleSelectLogout}
        />
      </div>
    </Drawer>
  );
});

export type DrawerItemProps = {
  value: string;
  Icon: React.ReactNode;
  onSelect: (value: string) => void;
  isSelected?: boolean;
};

const SideDrawerItem = memo((props: DrawerItemProps) => {
  const { value, Icon, onSelect, isSelected } = props;

  const rootClassName = classNames('SideDrawer__Item', {
    ['selected']: isSelected,
  });

  const handleItemClick = () => {
    onSelect(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    const key = e.key as string;
    switch (key) {
      case 'Enter': {
        onSelect(value);
        return;
      }
    }
  };

  return (
    <div
      className={rootClassName}
      onClick={handleItemClick}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="SideDrawer__Icon">{Icon}</div>
      <span className="SideDrawer__Text">{value}</span>
    </div>
  );
});
