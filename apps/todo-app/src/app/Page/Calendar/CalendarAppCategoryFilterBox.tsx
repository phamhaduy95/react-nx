import { CheckBox, CheckBoxProps } from '@phduylib/my-component';
import { useCallback, useEffect, useState } from 'react';
import { appApi } from '../../../redux/appApi';
import { useAppAction, useAppDispatch, useAppSelector } from '../../../redux';
import { shallowEqual } from 'react-redux';

const categoriesList = [];
const SHOW_LIMIT = 4;

export function CalendarAppCategoryFilterBox() {
  const action = useAppAction();
  const dispatch = useAppDispatch();
  const [isCheckAll, setCheckAll] = useState(true);
  const isOverLimit = categoriesList.length > SHOW_LIMIT;
  const { data: categories } = appApi.useGetAllForUserQuery(undefined);

  const handleClickCheckAll: NonNullable<CheckBoxProps['onSelected']> =
    useCallback((value, isSelected) => {
      setCheckAll(isSelected);
    }, []);

  const handelCategorySelect: NonNullable<CheckBoxProps['onSelected']> =
    useCallback((value, isSelected) => {
      if (isSelected) {
        dispatch(action.CalendarApp.addNewCategoryFilter({ categoryId: value }));
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

  return (
    <div className="CalendarApp__CategoryFilterBox">
      <div className="CalendarApp__BoxHeader">Categories</div>
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
        {isOverLimit && (
          <div className="CalendarApp__OverShowCategoryLimitSign">...</div>
        )}
      </ul>
    </div>
  );
}
