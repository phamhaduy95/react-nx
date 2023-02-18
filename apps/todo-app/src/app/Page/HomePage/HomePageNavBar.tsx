import {
  DropDown,
  DropDownItem,
  IconButton,
  ToolTips,
} from '@phduylib/my-component';
import {
  useAppAction,
  useAppDispatch,
} from 'apps/todo-app/src/redux';
import { memo } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import userImage from 'apps/todo-app/src/assets/User-Profile-PNG.png';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export const HomePageNavBar = memo(() => {
  const action = useAppAction();
  const dispatch = useAppDispatch();
  const handleClickToOpenSideDrawer = () => {
    dispatch(action.HomePage.toggleDrawer(true));
  };

  return (
    <div className="HomePage__NavBar">
      <div className="NavBar__MenuIconContainer">
        <ToolTips
          text="Menu"
          className="Menu__Tooltips"
          placement="bottom-center"
        >
          <IconButton onClick={handleClickToOpenSideDrawer} variant="secondary">
            <MenuIcon />
          </IconButton>
        </ToolTips>
      </div>
      <NotificationIcon />
      <UserImage />
    </div>
  );
});

function NotificationIcon() {
  return (
    <DropDown
      className="NavBar__NotificationButton"
      triggerEL={
        <IconButton variant="secondary">
          <NotificationsNoneOutlinedIcon />
        </IconButton>
      }
      popupPlacement="bottom-right"
    >
      <DropDownItem>notification 1</DropDownItem>
      <DropDownItem>notification 2</DropDownItem>
    </DropDown>
  );
}

function UserImage() {
  const action = useAppAction();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogoutSelect = () => {
    dispatch(action.SignOutModal.toggleOpen(true));
  };

  const handleAccountOptionSelect = () => {
    navigate('/account/account-settings');
  };

  return (
    <DropDown
      className="NavBar__UserImage"
      triggerEL={<img src={userImage} />}
      popupPlacement="bottom-right"
    >
      <DropDownItem onSelect={handleAccountOptionSelect}>Account</DropDownItem>
      <DropDownItem onSelect={handleLogoutSelect}>Log out</DropDownItem>
    </DropDown>
  );
}
