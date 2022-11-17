import { UserPageSectionDivider } from './UserPageSectionDivider';
import { UserPageUpdateEmailSection } from './UserPageUpdateEmailSection';
import { UserPageUpdatePasswordSection } from './UserPageUpdatePasswordSection';
import { appApi } from '../../../redux/appApi/appApi';

export function UserPageSecurity() {
  const {data} = appApi.useAuthenticateQuery(""); 


  return (
    <div className="UserPage__View UserPage__Security">
      <div className="UserPage__HeaderTitle">Security</div>
      <UserPageUpdateEmailSection email={data?.email} />
      <UserPageSectionDivider />
      <UserPageUpdatePasswordSection />
    </div>
  );
}
