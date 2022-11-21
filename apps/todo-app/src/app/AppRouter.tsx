import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import {
  CalendarApp,
  DayScheduleSection,
  MonthScheduleSection,
  WeekScheduleSection,
} from './Page/Calendar';
import FailedConnectionPage from './Page/FailedConnectionPage/FailedConnectionPage';
import { HomePage } from './Page/HomePage/HomePage';
import { LoginPage } from './Page/Login/LoginPage';
import { NotFoundPage } from './Page/NotFoundPage';
import { SignUpPage } from './Page/SignUpPage/SignUpPage';
import { TestPage } from './Page/TestPage/TestPage';
import {
  UserPageAccountSettings,
  UserPage,
  UserPageSecurity,
} from './Page/User';

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
        <Route path="account" element={<UserPage />}>
          <Route
            path="account-settings"
            element={<UserPageAccountSettings />}
          />
          <Route path="password" element={<UserPageSecurity />} />
        </Route>
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="sign-up" element={<SignUpPage />} />
      <Route path="test" element={<TestPage />} />
      <Route path="fail-connection" element={<FailedConnectionPage />} />
      <Route path="*" element={<NotFoundPage />}></Route>
    </>
  )
);
