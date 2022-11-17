import { memo, useImperativeHandle, useRef } from 'react';
import { forwardRef } from 'react';
import './Collapsible.scss';
import { useControlElementCollapsingState } from './hook';
import classNames from 'classnames';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';

export type CollapsibleProps = {
  children?: JSX.Element[] | JSX.Element | string;
  direction?: 'horizontal' | 'vertical';
  showed?: boolean;
  className?: string;
  onToggle?: (isShowed: boolean) => void;
};

const defaultPropsValue: Required<CollapsibleProps> = {
  children: <></>,
  direction: 'vertical',
  showed: true,
  className: '',
  onToggle(isShowed) {},
};

function supplyDefaultValueWhenUndefineOrNull<T extends Object>(
  props: T,
  defaultValue: Required<T>
) {
  let tempProps: Required<T> = { ...defaultValue, ...props };
  return tempProps;
}

export const Collapsible = memo(
  forwardRef<HTMLDivElement, CollapsibleProps>((props, ref) => {
    const newProps = supplyDefaultValueWhenUndefineOrNull(
      props,
      defaultPropsValue
    );

    const { children, onToggle, showed, className } = newProps;
    const rootRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => rootRef.current as HTMLDivElement, []);

    useControlElementCollapsingState(rootRef, newProps);

    useEffectSkipFirstRender(() => {
      onToggle(showed);
    }, [showed]);

    const rootClassName = classNames('collapsible', className, {
      showed: showed,
    });

    return (
      <div className={rootClassName} ref={rootRef}>
        {children}
      </div>
    );
  })
);

export default Collapsible;
