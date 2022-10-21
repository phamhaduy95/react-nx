import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import HomePage from './app';
import {
  CalendarApp,
  DayScheduleSection,
  MonthScheduleSection,
  WeekScheduleSection,
} from './Page/Calendar';

import { LoginPage } from './Page/Login/LoginPage';

export const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />}>
        <Route path="today" element={<></>} />
        <Route path="calendar" element={<CalendarApp />}>
          <Route path="month" element={<MonthScheduleSection />} />
          <Route path="week" element={<WeekScheduleSection />} />
          <Route path="day" element={<DayScheduleSection />} />
        </Route>
        <Route path="settings" element={<></>} />
      </Route>
      <Route path="login" element={<LoginPage />} />
    </>
  )
);
