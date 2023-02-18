import { useEffect } from 'react';
import {
  Button,
  IconButton,
  ToggleGroup,
  ToggleGroupItem,
  ToggleGroupProps,
  ToolTips,
} from '@phduylib/my-component';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './CalendarApp.scss';
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
import { AppModal } from '../../../components/AppModal/AppModal';
import classNames from 'classnames';
import MenuIcon from '@mui/icons-material/Menu';
import { ModalType } from 'apps/todo-app/src/type/model';


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

  const handleClickToOpenCategoryFilterModal = () => {
    dispatch(action.AppModal.openModal(ModalType.filterCategory));
  };

  const handleAddTaskButtonClick = () => {
    dispatch(action.AppModal.openModal(ModalType.addAndUpdateTask));
    dispatch(action.TaskEditModal.addTask({}));
  };

  return (
    <>
      <div className="CalendarApp">
        <div className="CalendarApp__SideBox">
          <Button
            className="CalendarApp__AddButton"
            onClick={handleAddTaskButtonClick}
          >
            Add Task
          </Button>
          <CalendarAppCategoryFilterBox />
        </div>
        <div className="CalendarApp__Content">
          <div className="CalendarApp__Control">
            <div className="CalendarApp__MenuIconContainer">
              <ToolTips
                text="Categories"
                className="Menu__Tooltips"
                placement="bottom-center"
              >
                <IconButton
                  variant="secondary"
                  onClick={handleClickToOpenCategoryFilterModal}
                >
                  <MenuIcon />
                </IconButton>
              </ToolTips>
            </div>
            <NavigationButton mode="regular-viewport" />
            <ToggleGroup
              onChange={handleToggleSelect}
              className="CalendarApp__ToggleGroup"
            >
              {renderToggleItems()}
            </ToggleGroup>
          </div>
          <NavigationButton mode="small-viewport" />
          <div className="CalendarApp__View">
            <Outlet />
          </div>
        </div>
      </div>

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

type NavigationButtonProps = {
  mode: 'small-viewport' | 'regular-viewport';
};

function NavigationButton(props: NavigationButtonProps) {
  const { mode } = props;
  const action = useAppAction();
  const dispatch = useAppDispatch();
  const type = useAppSelector((state) => state.CalendarApp.currentCalendarType);
  const handleClickToNext = () => {
    dispatch(action.CalendarApp.gotoNext(type));
  };

  const handleClickPrevious = () => {
    dispatch(action.CalendarApp.gotoPrevious(type));
  };

  const rootClassName = classNames(
    'CalendarApp__NavigationButton',
    `--for-${mode}`
  );

  const PreviousButton = (
    <IconButton
      className="CalendarApp__PreviousIcon"
      onClick={handleClickPrevious}
      variant="secondary"
      key="pervious-button"
    >
      <ArrowBackIosIcon className="BackIcon" />
    </IconButton>
  );

  const NextButton = (
    <IconButton
      className="CalendarApp__NextIcon"
      onClick={handleClickToNext}
      variant="secondary"
      key="next-button"
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );

  if (mode === 'regular-viewport')
    return (
      <>
        <div className={rootClassName}>
          {PreviousButton}
          {NextButton}
          <CalendarDateString />
        </div>
      </>
    );
  return (
    <div className={rootClassName}>
      {PreviousButton}
      <CalendarDateString />
      {NextButton}
    </div>
  );
}
