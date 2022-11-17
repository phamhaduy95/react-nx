import React, { useEffect } from 'react';

import './BreadCrumbs.scss';
import {
  BreadCrumbsStoreProvider,
  useBreadCrumbsStore,
} from './BreadCrumbStore';
import { giveIndexForBreadCrumbsItem } from './BreadCrumbItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { BreadCrumbsSeparator } from './BreadCrumbsSeparator';
import classNames from 'classnames';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';

export type BreadCrumbsProps = {
  children: JSX.Element[] | JSX.Element;
  className?: string;
  collapsed?: boolean;
  itemsAfterCollapse?: number;
  itemsBeforeCollapse?: number;
  maxItems?: number;
  separator?: string;
  onExpanded?: (isExpanded: boolean) => void;
};

const defaultProps: Required<BreadCrumbsProps> = Object.freeze({
  children: <></>,
  className: '',
  maxItems: 3,
  separator: '>',
  collapsed: false,
  itemsAfterCollapse: 1,
  itemsBeforeCollapse: 1,
  onExpanded() {},
});

export function BreadCrumbs(props: BreadCrumbsProps) {
  return (
    <BreadCrumbsStoreProvider>
      <WrappedBreadCrumbs {...props} />
    </BreadCrumbsStoreProvider>
  );
}

function WrappedBreadCrumbs(props: BreadCrumbsProps) {
  const newProps = { ...defaultProps, ...props };
  const action = useBreadCrumbsStore((state) => state.action);
  const { children, className, separator, collapsed, onExpanded } = newProps;
  const isExpanded = useBreadCrumbsStore((state) => state.isExpanded);
  const indexedItems = giveIndexForBreadCrumbsItem(children);
  const itemsWithSeparator = addSeparatorToItem(indexedItems, separator);
  const itemsView = generateBreadCrumbsItemsView(
    itemsWithSeparator,
    !isExpanded,
    newProps
  );

  useEffect(() => {
    action.toggleExpand(!collapsed);
  }, [collapsed]);

  useEffectSkipFirstRender(() => {
    onExpanded(isExpanded);
  }, [isExpanded]);

  const rootClassName = classNames('BreadCrumbs', className);

  return <div className={rootClassName}>{itemsView}</div>;
}

function BreadCrumbsCollapsedIcon() {
  const action = useBreadCrumbsStore((state) => state.action);
  const handleClick = () => {
    action.toggleExpand(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    const key = e.key;
    switch (key) {
      case 'Enter': {
        action.toggleExpand(true);
        return;
      }
    }
  };

  return (
    <span
      tabIndex={0}
      onKeyDown={handleKeyPress}
      className="BreadCrumbs__CollapsedIcon"
      onClick={handleClick}
    >
      <MoreHorizIcon />
    </span>
  );
}

function generateBreadCrumbsItemsView(
  items: JSX.Element[],
  isCollapsed: boolean,
  props: Required<BreadCrumbsProps>
) {
  const { maxItems, separator, itemsAfterCollapse, itemsBeforeCollapse } =
    props;
  const numberOfItems = items.length;
  if (numberOfItems <= maxItems || !isCollapsed) return items;
  const newItemArray: JSX.Element[] = [];
  let count = 1;
  let numberOfCollapsedIcon = 0;
  for (let item of items) {
    if (
      count <= itemsBeforeCollapse ||
      numberOfItems - count < itemsAfterCollapse
    ) {
      newItemArray.push(item);
      count++;
      continue;
    }
    if (numberOfCollapsedIcon === 0) {
      newItemArray.push(<BreadCrumbsCollapsedIcon />);
      newItemArray.push(
        <BreadCrumbsSeparator
          separator={separator}
          key={`separator-${count}`}
        />
      );
      numberOfCollapsedIcon++;
    }

    count++;
  }

  return newItemArray;
}

function addSeparatorToItem(items: JSX.Element[], separator: React.ReactNode) {
  let returnLists: JSX.Element[] = [];
  let count = 1;
  for (let item of items) {
    if (count === items.length) {
      returnLists.push(item);
      continue;
    }
    const itemWithSeparator = (
      <>
        {item}
        <BreadCrumbsSeparator
          separator={separator}
          key={`separator-${count}`}
        />
      </>
    );
    returnLists.push(itemWithSeparator);

    count++;
  }
  return returnLists;
}
