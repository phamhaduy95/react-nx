import './Accordion.scss';
import AccordionStoreProvider from './AccordionStoreProvider';
import { useEffect } from 'react';
import { useAccordionStore } from './AccordionStoreProvider';
import GlobalStyleProvider from '../GlobalStyleProvider';
import classNames from 'classnames';

export type AccordionProps = {
  children: JSX.Element[] | JSX.Element;
  className?: string;
  isAlwaysOpen?: boolean;
};

const defaultProps: Required<AccordionProps> = {
  children: <></>,
  className: '',
  isAlwaysOpen: false,
};

export function Accordion(props: AccordionProps) {
  return (
    <AccordionStoreProvider>
      <WrappedAccordion {...props} />
    </AccordionStoreProvider>
  );
}
function WrappedAccordion(props: AccordionProps) {
  const newPros = { ...defaultProps, ...props };
  const { className, children, isAlwaysOpen } = newPros;
  const action = useAccordionStore((state) => state.action);
  const rootClassName = classNames('Accordion', className);
  useEffect(() => {
    action.changeSettings({ isAlwaysOpen });
  }, [isAlwaysOpen]);

  return (
    <GlobalStyleProvider>
      <div className={rootClassName}>{children}</div>
    </GlobalStyleProvider>
  );
}
