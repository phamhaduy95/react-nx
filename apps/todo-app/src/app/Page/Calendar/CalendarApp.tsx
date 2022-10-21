import { useEffect, useState } from 'react';
import {
  ToggleGroup,
  ToggleGroupItem,
  ToggleGroupProps,
} from '@phduylib/my-component';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './CalendarApp.scss';
import { TaskEditModal } from '../../../components/TaskEditModal/TaskEditModal';
const calendarTypes = ['Month', 'Week', 'Day'];
// Note: since the Redux toolkit integrate the immer lib for handling updating state, the state within redux store will be freezed so  that it cannot be altered or mutated. As the result, any future code which {use state should use  tactic copy.

export function CalendarApp() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selectedType, setType] = useState('month');

  useEffect(() => {
    const array = pathname.split('/');
    const target = array[array.length - 1];
    console.log(target);
    setType(target);
  }, [pathname]);

  const handleToggleSelect: ToggleGroupProps['onChange'] = (value) => {
    navigate(`${value}`);
  };

  const renderToggleItems = () => {
    return calendarTypes.map((e) => {
      const isSelected = selectedType === e.toLowerCase();
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
        <div className="CalendarApp__Control">
          <ToggleGroup
            onChange={handleToggleSelect}
            className="CalendarApp__ToggleGroup"
          >
            {renderToggleItems()}
          </ToggleGroup>
        </div>
        <div className="CalendarApp__View">
          <Outlet />
        </div>
      </div>
      <TaskEditModal />
    </>
  );
}
