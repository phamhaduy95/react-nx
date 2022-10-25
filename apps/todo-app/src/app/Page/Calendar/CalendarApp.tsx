import { useEffect, useState } from 'react';
import {
  ToggleGroup,
  ToggleGroupItem,
  ToggleGroupProps,
} from '@phduylib/my-component';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './CalendarApp.scss';
import { TaskEditModal } from '../../../components/TaskEditModal';
import { CalendarAppCategoryFilterBox } from './CalendarAppCategoryFilterBox';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
  useAppSelector,
  useAppAction,
  useAppDispatch,
} from '../../../redux/rootStore';
import { CalendarAppState } from 'apps/todo-app/src/redux/CalendarApp';
import { getDayString, getWeekString, getMonthString } from './utils';

const calendarTypes = ['Month', 'Week', 'Day'];
// Note: since the Redux toolkit integrate the immer lib for handling updating state, the state within redux store will be freezed so  that it cannot be altered or mutated. As the result, any future code which {use state should use  tactic copy.

export function CalendarApp() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const action = useAppAction();
  const dispatch = useAppDispatch();
  const type = useAppSelector((state) => state.CalendarApp.currentCalendarType);

  useEffect(() => {
    const array = pathname.split('/');
    let target = array[array.length - 1];
    if (target === 'calendar') {
      navigate(type);
      return;
    }
    const text = target as CalendarAppState['currentCalendarType'];
    dispatch(action.CalendarApp.changeCalendarType(text));
  }, [pathname]);

  const handleToggleSelect: ToggleGroupProps['onChange'] = (value) => {
    navigate(`${value}`);
  };

  const handleClickToNext = () => {
    dispatch(action.CalendarApp.gotoNext(type));
  };

  const handleClickPrevious = () => {
    dispatch(action.CalendarApp.gotoPrevious(type));
  };

  const renderToggleItems = () => {
    return calendarTypes.map((e) => {
      const isSelected = type === e.toLowerCase();
      return (
        <ToggleGroupItem value={e.toLowerCase()} selected={isSelected} key={e}>
          {e.toLowerCase()}
        </ToggleGroupItem>
      );
    });
  };

  return (
    <>
      <div className="CalendarApp">
        <div className="CalendarApp__SideBox">
          <button className="CalendarApp__AddButton">Add Task</button>
          <CalendarAppCategoryFilterBox />
        </div>
        <div className="CalendarApp__Content">
          <div className="CalendarApp__Control">
            <div className="CalendarApp__NavigationButton">
              <ArrowBackIosIcon
                className="CalendarApp__PreviousIcon"
                onClick={handleClickPrevious}
              />
              <ArrowForwardIosIcon
                className="CalendarApp__NextIcon"
                onClick={handleClickToNext}
              />
            </div>
            <CalendarDateString />
            <ToggleGroup
              onChange={handleToggleSelect}
              className="CalendarApp__ToggleGroup"
            >
              {renderToggleItems()}
            </ToggleGroup>
          </div>
          <div className="CalendarApp__View">
            {/* <div className="CalendarApp__DateNavigationBox">
        <ArrowBackIosIcon
          className="CalendarApp__PreviousIcon"
          onClick={handleGotoPreviousWeek}
        />
        <ArrowForwardIosIcon
          className="CalendarApp__NextIcon"
          onClick={handleGotoNextWeek}
        />
        {renderWeekString()}
      </div> */}
            <Outlet />
          </div>
        </div>
      </div>
      <TaskEditModal />
    </>
  );
}

function CalendarDateString() {
  const dayStr = useAppSelector((state) => {
    const { currentCalendarType, dateArgs } = state.CalendarApp;
    switch (currentCalendarType) {
      case 'day':
        return getDayString(dateArgs.dateArg);
      case 'week':
        return getWeekString(dateArgs.weekArg);
      case 'month':
        return getMonthString(dateArgs.monthArg);
    }
  });

  return <div className="CalendarApp__DateString">{dayStr}</div>;
}
