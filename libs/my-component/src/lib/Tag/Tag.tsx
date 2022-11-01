import React, { useRef, useState } from 'react';
import { ReactComponent as CloseIcon } from './close-icon.svg';
import ClickOutSideWatcher from '../ClickOutsideWatcher/ClickOutSideWatcher';
import './Tag.scss';
import {GlobalStyleProvider} from '../GlobalStyleProvider';
type Props = {
  onRemove?: () => void;
  onClick?: () => void;
  disabled?: boolean;
  text: string;
  removable?: boolean;
  clickable?: boolean;
};

const defaultProps: Required<Props> = {
  onRemove: () => {},
  onClick: () => {},
  disabled: false,
  text: '',
  removable: false,
  clickable: true,
};

export default function Tag(props: Props) {
  const newProps = { ...defaultProps, ...props };
  const { onRemove, onClick, disabled, text, clickable, removable } = newProps;
  const [isActive, setActive] = useState<boolean>(false);
  const ref = useRef(null);

  function makeDisabled() {
    if (disabled) return ' disabled';
    return '';
  }
  function applyClickedStyle() {
    if (clickable) return ' clickable';
    return '';
  }
  function makeActive() {
    if (!clickable) return '';
    if (isActive) return ' active';
    return '';
  }

  function applyRemovableStyle() {
    if (removable) return ' removable';
    return '';
  }

  function handleClick() {
    if (disabled) return;
    if (clickable) {
      setActive(true);
      if (onClick) onClick();
    }
  }

  function handleClose() {
    if (disabled) return;
    if (onRemove) onRemove();
  }

  function handleClickOutSide() {
    if (disabled) return;
    if (clickable) {
      setActive(false);
    }
  }

  const TagClassName = `Tag`
    .concat(makeDisabled())
    .concat(applyClickedStyle())
    .concat(applyRemovableStyle())
    .concat(makeActive());

  return (
    <GlobalStyleProvider>
      <ClickOutSideWatcher ref={ref} onClickOutSide={handleClickOutSide}>
        <div className={TagClassName} onClick={handleClick} ref={ref}>
          <p className="Tag__Text">{text}</p>
          <CloseIcon className="Tag__Close-icon" onClick={handleClose} />
        </div>
      </ClickOutSideWatcher>
    </GlobalStyleProvider>
  );
}
