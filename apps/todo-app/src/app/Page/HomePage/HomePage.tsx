import { SideBarItemProps, ToolTips, IconButton } from '@phduylib/my-component';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { memo, useCallback, useEffect } from 'react';
import { appApi } from '../../../redux/appApi/appApi';
import { useAppAction, useAppDispatch } from '../../../redux';
import { SignOutModal } from 'apps/todo-app/src/components/SignOutModal/SignOutModal';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { HomPageSideBar } from './HomePageSideBar';
import './HomePage.scss';
import { HomePageSideDrawer } from './HomePageSideDrawer';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useUserAuthenticate } from '../../hooks';
import { HomePageNavBar } from './HomePageNavBar';

export const NavItems = () => [
  {
    value: 'Calendar',
    Icon: <EventAvailableOutlinedIcon />,
  },
  {
    value: 'Account',
    Icon: <AccountCircleIcon />,
  },
];

export function HomePage() {
  const navigate = useNavigate();
  const action = useAppAction();
  const dispatch = useAppDispatch();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('calendar');
    }
  }, []);

  useUserAuthenticate();

  const handleItemSelect: NonNullable<SideBarItemProps['onSelected']> =
    useCallback((value) => {
      navigate(value.toLowerCase());
    }, []);

  const handleSelectLogOut = useCallback(() => {
    dispatch(action.SignOutModal.toggleOpen(true));
  }, []);

  return (
    <div className="HomePage">
      <HomPageSideBar
        onselectLogOut={handleSelectLogOut}
        onselectNavItem={handleItemSelect}
      />
      <HomePageSideDrawer
        onselectLogOut={handleSelectLogOut}
        onselectNavItem={handleItemSelect}
      />
      <div className="HomePage__View">
        <HomePageNavBar />
        <Outlet />
      </div>
      <SignOutModal />
    </div>
  );
}
