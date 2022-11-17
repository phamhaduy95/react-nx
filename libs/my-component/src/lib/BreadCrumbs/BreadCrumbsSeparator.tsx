import React from 'react';
type Props = {
  separator: React.ReactNode;
};

export function BreadCrumbsSeparator(props: Props) {
  const { separator } = props;
  return <span className="BreadCrumbs__Separator">{separator}</span>;
}
