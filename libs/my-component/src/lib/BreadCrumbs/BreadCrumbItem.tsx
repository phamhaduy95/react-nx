import React, { memo } from 'react';
import { ensureElementsListAsArray } from '../utils/ReactElementProcessor';
import classNames from 'classnames';
type BreadCrumbsItemProps = {
  children: React.ReactNode;
  value: string;
  className?: string;
  menu?: string[];
  disabled?: boolean;
};

const defaultProps: Omit<
  Required<BreadCrumbsItemProps>,
  'children' | 'className'
> = {
  value: '',
  menu: [],
  disabled: false,
};

export function BreadCrumbsItem(props: BreadCrumbsItemProps) {
  return <></>;
}

export function giveIndexForBreadCrumbsItem(
  items: JSX.Element[] | JSX.Element
) {
  const arrayItems = ensureElementsListAsArray(items);
  const returnList: JSX.Element[] = [];
  let i = 0;
  for (let item of arrayItems) {
    if (item.type.name !== BreadCrumbsItem.name) continue;
    const props = item.props as BreadCrumbsItemProps;
    const isActive = i === arrayItems.length - 1;
    const indexedItem = (
      <IndexedBreadCrumbItem
        {...props}
        key={`breadcrumbsItem-${i}`}
        isActive={isActive}
      />
    );
    i++;
    returnList.push(indexedItem);
  }
  return returnList;
}

type IndexedItemProps = BreadCrumbsItemProps & { isActive: boolean };

export const IndexedBreadCrumbItem = memo((props: IndexedItemProps) => {
  const newProps = { ...defaultProps, ...props };

  const { children, value, menu, disabled, className, isActive } = newProps;
  const rootClassName = classNames('BreadCrumbs__Item', className, {
    disabled: disabled,
    ['is-active']: isActive,
  });

  return <span className={rootClassName}>{children}</span>;
});

export default BreadCrumbsItem;
