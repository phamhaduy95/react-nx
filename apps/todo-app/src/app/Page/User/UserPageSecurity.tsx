import { UserPageSectionDivider } from './UserPageSectionDivider';
import { UserPageUpdateEmailSection } from './UserPageUpdateEmailSection';
import { UserPageUpdatePasswordSection } from './UserPageUpdatePasswordSection';

export function UserPageSecurity() {
  return (
    <div className="UserPage__View UserPage__Security">
      <div className="UserPage__HeaderTitle">Security</div>
      <UserPageUpdateEmailSection />
      <UserPageSectionDivider />
      <UserPageUpdatePasswordSection />
    </div>
  );
}
