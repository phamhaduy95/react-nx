import { CheckBox, CheckBoxProps } from "@phduylib/my-component";
import { useCallback, useState } from "react";

const categoriesList = ['Business', 'Personal', 'Family', 'Another', 'School'];
const SHOW_LIMIT = 4;

export function CalendarAppCategoryFilterBox() {
  const [isCheckAll, setCheckAll] = useState(false);
  const isOverLimit = categoriesList.length > SHOW_LIMIT;
  

  const handleClickCheckAll: NonNullable<CheckBoxProps['onSelected']> =
    useCallback((value, isSelected) => {
      setCheckAll(isSelected);
    }, []);

  const renderCategoryOptions = () => {
    return categoriesList.slice(0, SHOW_LIMIT).map((value, i) => {
      return (
        <CheckBox
          className="CalendarApp__Category"
          value={value}
          label={value}
          key={value}
          isSelected={isCheckAll}
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