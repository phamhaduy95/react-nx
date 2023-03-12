import { SideBarItemProps } from '@phduylib/my-component';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { useAppAction, useAppDispatch } from '../../../redux';
import { SignOutModal } from 'apps/todo-app/src/components/SignOutModal/SignOutModal';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { HomPageSideBar } from './HomePageSideBar';
import './HomePage.scss';
import { HomePageSideDrawer } from './HomePageSideDrawer';
import { useUserAuthenticate } from '../../hooks';
import { HomePageNavBar } from './HomePageNavBar';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';


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

  const { isLoading } = useUserAuthenticate();
  
  
  const handleItemSelect: NonNullable<SideBarItemProps['onSelected']> =
    useCallback((value) => {
      navigate(value.toLowerCase());
    }, []);

  const handleSelectLogOut = useCallback(() => {
    dispatch(action.SignOutModal.toggleOpen(true));
  }, []);

  if (!isLoading) 
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
        <Outlet/>
      </div>
      <SignOutModal />
    </div>
  );
  return <LoadingScreen/>
}
