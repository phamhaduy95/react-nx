import React, { useEffect } from 'react';
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import './UserPage.scss';

export function UserPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/account') {
      navigate('account-settings');
    }
  }, []);

  return (
    <div className="UserPage">
      <UserPageSideBar />
      <Outlet />
    </div>
  );
}

function UserPageSideBar() {
  return (
    <div className="UserPage__SideBar">
      <UserPageSideBarItem
        to="account-settings"
        label="Account"
        icon={<PersonIcon />}
      />
      <UserPageSideBarItem to="password" label="Security" icon={<LockIcon />} />
    </div>
  );
}

type SideBarItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
};

function UserPageSideBarItem(props: SideBarItemProps) {
  const { to, icon, label } = props;

  return (
    <NavLink className="UserPage__SideBarItem" to={to}>
      <span className="UserPage__SideBarItemIcon">{icon}</span>
      <span className="UserPage__SideBarItemLabel">{label}</span>
    </NavLink>
  );
}
