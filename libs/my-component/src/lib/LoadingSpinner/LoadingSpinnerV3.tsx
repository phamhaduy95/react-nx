import classNames from 'classnames';
import { defaultSpinnerProps } from './LoadingSpinnerV1';
import { LoadingSpinnerProps } from './type';

export function LoadingSpinnerV3(props: LoadingSpinnerProps) {
  const newProps = { ...defaultSpinnerProps, ...props };
  const { className, variant } = newProps;
  const rootClassName = classNames(
    'LoadingSpinnerV3',
    className,
    `--${variant}`
  );
  return (
    <svg
      className={rootClassName}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="50"
        cy="50"
        r="30"
        fill="transparent"
        strokeWidth="8px"
        strokeDasharray="160"
      />
    </svg>
  );
}
