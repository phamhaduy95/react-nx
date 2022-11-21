import React, { useCallback, useEffect, useMemo, useState } from 'react';
import userImg from 'apps/todo-app/src/assets/User-Profile-PNG.png';
import {
  Button,
  TextField,
  LoadingButton,
  TextFieldProps,
} from '@phduylib/my-component';
import { UserPageSectionDivider } from './UserPageSectionDivider';
import { appApi } from 'apps/todo-app/src/redux/appApi';
import { ModalType, ReduxUserData } from '../../../redux/types';
import { useAppAction, useAppDispatch } from 'apps/todo-app/src/redux';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

const defaultUserData: ReduxUserData = Object.freeze({
  id: '',
  email: '',
  address: '',
  firstName: '',
  lastName: '',
  organization: '',
  phoneNumber: '',
  displayName: '',
});

export function UserPageAccountSettings() {
  const { user } = appApi.useAuthenticateQuery('', {
    selectFromResult: ({ data }) => {
      const user = data === undefined ? defaultUserData : data;
      return { user };
    },
  });

  return (
    <div className="UserPage__View UserPage__AccountSettings">
      <div className="UserPage__HeaderTitle">Account Details</div>
      <UserPageUserAvatar userData={user} />
      <UserPageSectionDivider />
      <UserPageAccountDataSection userData={user} />
    </div>
  );
}

type Props = {
  userData: ReduxUserData;
};

function UserPageUserAvatar(props: Props) {
  const { userData } = props;

  return (
    <div className="UserPage__AvatarSection">
      <div className="UserPage__Image">
        <img src={userImg} />
      </div>
      <div className="UserPage__AvatarControlBox">
        <p className="UserPage__UserName">{userData.displayName}</p>
        <div className="UserPage__AvatarButtonBox">
          <Button variant="primary">Change Avatar</Button>
          <Button variant="secondary" type="outlined">
            Reset
          </Button>
        </div>
        <p className="UserPage__AvatarMessage">Allow JPG and PNG.</p>
      </div>
    </div>
  );
}

function UserPageAccountDataSection(props: Props) {
  const { userData: fetchedUserData } = props;
  const action = useAppAction();
  const dispatch = useAppDispatch();
  const [updateUser, result] = appApi.useUpdateUserMutation({
    fixedCacheKey: 'shared-update-user',
  });

  const [userData, setUserData] = useState<ReduxUserData>(defaultUserData);

  useEffect(() => {
    setUserData(fetchedUserData);
  }, [fetchedUserData]);

  useEffect(() => {
    const { isError, isSuccess } = result;
    if (isError) {
      dispatch(action.AppModal.openModal(ModalType.error));
      const error = result.error as FetchBaseQueryError;
      switch (error.status) {
        case 'FETCH_ERROR': {
          dispatch(action.AppModal.updateMessages(['cannot connect to server']));
          break;
        }
      }
      result.reset();
      return;
    }
    if (isSuccess) {
      dispatch(action.AppModal.openModal(ModalType.success));
      result.reset();
      return;
    }
  }, [result]);

  const handleTextFieldValueChange: NonNullable<
    TextFieldProps['onValueChange']
  > = useCallback((value, name) => {
    setUserData((prev) => ({ ...prev, [`${name}`]: value }));
  }, []);

  const handleSaveChangeClick = () => {
    updateUser({ ...userData });
  };

  const handleClearClick = () => {
    setUserData(fetchedUserData);
  };

  return (
    <div className="UserPage__AccountDataSection">
      <div className="UserPage__AccountDataInputs">
        <TextField
          label="username"
          name="displayName"
          value={userData.displayName}
          onValueChange={handleTextFieldValueChange}
        />
        <TextField
          label=" organization"
          name="organization"
          value={userData.organization}
          onValueChange={handleTextFieldValueChange}
        />
        <TextField
          label="first name"
          name="firstName"
          value={userData.firstName}
          onValueChange={handleTextFieldValueChange}
        />
        <TextField
          label="last name"
          name="lastName"
          value={userData.lastName}
          onValueChange={handleTextFieldValueChange}
        />
        <TextField
          label="contract number"
          type="number"
          name="phoneNumber"
          value={userData.phoneNumber}
          onValueChange={handleTextFieldValueChange}
        />
        <TextField
          label="address"
          name="address"
          value={userData.address}
          onValueChange={handleTextFieldValueChange}
        />
      </div>
      <div className="UserPage__AccountDataControl">
        <LoadingButton
          isLoading={result.isLoading}
          onClick={handleSaveChangeClick}
        >
          Save Change
        </LoadingButton>
        <Button type="outlined" onClick={handleClearClick}>
          Reset
        </Button>
      </div>
    </div>
  );
}
