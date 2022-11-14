import { Button, Collapsible, TextField } from '@phduylib/my-component';
import { appApi } from 'apps/todo-app/src/redux/appApi';
import { memo, useCallback, useEffect, useState } from 'react';
import { validateEmailData } from './validation';
import { ErrorMessage, UserEmailInput } from './validation/type';
import { LoadingButton } from '../../../../../../libs/my-component/src/lib/Button/LoadingButton';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { Preview } from '@mui/icons-material';
import { useAppAction, useAppDispatch } from '../../../redux/rootStore';
import { ModalType } from 'apps/todo-app/src/redux';

const defaultErrorMessage: ErrorMessage<UserEmailInput> = Object.freeze({
  newEmail: false,
  password: false,
});

const defaultInput: UserEmailInput = Object.freeze({
  newEmail: '',
  password: '',
});

export const UserPageUpdateEmailSection = memo(() => {
  const action = useAppAction();
  const dispatch = useAppDispatch();
  const [isExpanded, setExpanded] = useState(false);
  const [updateEmail, result] = appApi.useChangeEmailMutation();
  const [inputData, setInputData] = useState<UserEmailInput>(defaultInput);
  const [errors, setErrors] =
    useState<ErrorMessage<UserEmailInput>>(defaultErrorMessage);

  const handleClick = () => {
    setExpanded((prev) => !prev);
  };

  useEffect(() => {
    const { isError, isSuccess } = result;
    if (isError) {
      const error = result.error as FetchBaseQueryError;
      if (error.status === 400) {
        const data = error.data as Partial<ErrorMessage<UserEmailInput>>;
        setErrors((prev) => ({ ...prev, ...data }));
      }
      dispatch(action.AppModal.openModal(ModalType.error));
      return;
    }
    if (isSuccess) {
      dispatch(action.AppModal.openModal(ModalType.success));
    }
  }, [result]);

  const handleInputValueChange = useCallback((value: string, name?: string) => {
    setInputData((prev) => ({ ...prev, [`${name}`]: value }));
  }, []);

  const handleSaveChangeClick = async () => {
    const { error, result } = await validateEmailData(inputData);
    if (result) {
      setErrors({ ...defaultErrorMessage });
      await updateEmail(inputData);
      return;
    }
    setErrors({ ...defaultErrorMessage, ...error });
  };

  const handleClearClick = useCallback(() => {
    setInputData({ ...defaultInput });
    setErrors({ ...defaultErrorMessage });
  }, []);

  return (
    <>
      <div className="UserPage__SecuritySection">
        <div className="SecuritySection__DataDisplayBox">
          <p className="SecuritySection__Label">Email Address</p>
          <p className="SecuritySection__Text">www.guest@gmail.com</p>
        </div>
        <Button
          className="UserPage__Security__ConfirmButton"
          type="outlined"
          onClick={handleClick}
        >
          {isExpanded ? 'Cancel' : 'Change Email'}
        </Button>
      </div>
      <Collapsible
        className="SecuritySection__DataChangeArea"
        direction="vertical"
        showed={isExpanded}
      >
        <div className="SecuritySection__DataInput">
          <TextField
            label="new email address"
            name="newEmail"
            value={inputData.newEmail}
            error={errors.newEmail}
            onValueChange={handleInputValueChange}
          />
          <TextField
            type="password"
            label="password"
            name="password"
            value={inputData.password}
            error={errors.password}
            onValueChange={handleInputValueChange}
          />
        </div>
        <div className="SecuritySection__DataControlBox">
          <LoadingButton
            onClick={handleSaveChangeClick}
            isLoading={result.isLoading}
          >
            Save Change
          </LoadingButton>
          <Button
            type="outlined"
            variant="secondary"
            onClick={handleClearClick}
            disabled={result.isLoading}
          >
            Clear
          </Button>
        </div>
      </Collapsible>
    </>
  );
});
