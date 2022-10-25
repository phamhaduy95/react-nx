import {
  SideBar,
  SideBarItem,
  SideBarItemList,
  SideBarItemProps,
} from '@phduylib/my-component';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import './HomePage.scss';
import { Outlet, redirect, useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { appApi } from '../../../redux/appApi/appApi';
import { useAppAction, useAppDispatch } from '../../../redux';
import { SignOutModal } from 'apps/todo-app/src/components/SignOutModal/SignOutModal';


export function HomePage() {
  const navigate = useNavigate();
  const action = useAppAction();
  const dispatch = useAppDispatch();
  const [authenticate,] = appApi.useAuthenticateMutation();
  useEffect(()=>{
      authenticate(undefined).unwrap().catch(e=>{
        navigate("login");
      });
  },[]);


  const handleItemSelect: NonNullable<SideBarItemProps['onSelected']> =
    useCallback((value) => {
      navigate(value.toLowerCase());
    }, []);

  const handleSelectLogOut:NonNullable<SideBarItemProps['onSelected']> =()=>{
    dispatch(action.SignOutModal.toggleOpen(true));
  }

  return (
    <div className="HomePage">
      <SideBar
        className="HomePage__SideBar"
        BranchIcon={<></>}
        BranchText={'CalendarApp'}
      >
        <SideBarItemList divider>
          <SideBarItem
            value="Today"
            label="Today"
            Icon={<SettingsOutlinedIcon />}
            onSelected={handleItemSelect}
          />
          <SideBarItem
            value="Calendar"
            label="Calendar"
            Icon={<EventAvailableOutlinedIcon />}
            onSelected={handleItemSelect}
          />
          <SideBarItem
            value="Settings"
            label="Settings"
            Icon={<SettingsOutlinedIcon />}
            onSelected={handleItemSelect}
          />
        </SideBarItemList>
        <SideBarItemList>
          <SideBarItem
            value="log out"
            label="log out"
            Icon={<LogoutOutlinedIcon />}
            type="button"
            onSelected={handleSelectLogOut}
          ></SideBarItem>
        </SideBarItemList>
      </SideBar>
      <div className="HomePage__View">
        <div className='HomePage__HeaderBar'>
            

        </div>
        <Outlet/>
      </div>
      <SignOutModal/>
    </div>
  );
}
