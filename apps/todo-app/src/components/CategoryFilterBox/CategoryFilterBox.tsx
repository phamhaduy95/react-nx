import {
  CheckBox,
  CheckBoxProps,
  DropDown,
  DropDownItem,
  ToolTips,
} from '@phduylib/my-component';
import React, { memo, useCallback, useState } from 'react';
import {
  ModalType,
  ReduxCategoryData,
  useAppAction,
  useAppDispatch,
} from '../../redux';
import { appApi } from '../../redux/appApi';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './CategoryFilterBox.scss';

const SHOW_LIMIT = 4;

const emptyCategories: ReduxCategoryData[] = [];

export function CategoryFilterBox() {
  const action = useAppAction();
  const dispatch = useAppDispatch();
  const [isCheckAll, setCheckAll] = useState(true);
  const { data: categories } = appApi.useGetAllForUserQuery(undefined, {
    selectFromResult: ({ data }) => {
      if (data === undefined) return { data: emptyCategories };
      return { data };
    },
  });
  const isOverLimit = categories.length > SHOW_LIMIT;

  const handleClickCheckAll: NonNullable<CheckBoxProps['onSelected']> =
    useCallback((value, isSelected) => {
      setCheckAll(isSelected);
    }, []);

  const handelCategorySelect: NonNullable<CheckBoxProps['onSelected']> =
    useCallback((value, isSelected) => {
      if (isSelected) {
        dispatch(
          action.CalendarApp.addNewCategoryFilter({ categoryId: value })
        );
        return;
      }
      dispatch(action.CalendarApp.removeCategoryFilter({ categoryId: value }));
    }, []);

  const renderCategoryOptions = () => {
    if (categories === undefined) return;
    return categories.slice(0, SHOW_LIMIT).map((category, i) => {
      const { categoryId, name } = category;
      return (
        <CheckBox
          className="CalendarApp__Category"
          value={categoryId}
          label={name}
          key={categoryId}
          isSelected={isCheckAll}
          onSelected={handelCategorySelect}
        />
      );
    });
  };

  const renderMoreCategoryNotification = () => {
    const remainingCategoryNumber = categories.length - SHOW_LIMIT;
    const tooltipsText = `+${remainingCategoryNumber} more`;
    return (
      isOverLimit && (
        <li className="CalendarApp__OverShowCategoryLimitSign">
          <ToolTips
            text={tooltipsText}
            padding={3}
            placement="bottom-center"
            enterDelay={100}
            leaveDelay={150}
          >
            <span>...</span>
          </ToolTips>
        </li>
      )
    );
  };

  return (
    <>
      <div className="CalendarApp__BoxHeader">
        <span className="CalendarApp__CategoryTitle">Categories</span>
        <ManageCategoryDropDown />
      </div>
      <ul className="CalendarApp__CategoriesList">
        <CheckBox
          className="CalendarApp__Category"
          key="checkAll"
          label="Check all"
          value="Check all"
          isSelected={isCheckAll}
          onSelected={handleClickCheckAll}
        />
        {renderCategoryOptions()}
        {renderMoreCategoryNotification()}
      </ul>
    </>
  );
}

const ManageCategoryDropDown = memo(() => {
  const action = useAppAction();
  const dispatch = useAppDispatch();

  const handleAddCategorySelect = () => {
    dispatch(action.AppModal.openModal(ModalType.addAndUpdateCategory));
    dispatch(action.AddAndUpdateCategoryModal.addCategory());
  };

  const handleManageCategoriesSelect = () => {
    dispatch(action.AppModal.openModal(ModalType.manageCategories));
  };

  return (
    <div className="CalendarApp__DropDownContainer">
      <DropDown
        className="CalendarApp__ManageCategoryDropDown"
        triggerEL={<MoreVertIcon />}
        popupPlacement="bottom-center"
      >
        <DropDownItem onSelect={handleAddCategorySelect}>
          Add Category
        </DropDownItem>
        <DropDownItem onSelect={handleManageCategoriesSelect}>
          Manage Categories
        </DropDownItem>
      </DropDown>
    </div>
  );
});
