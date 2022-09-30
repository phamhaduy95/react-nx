import { Popover, PopoverProps } from '@phduylib/my-component';
import React, {  useState } from 'react';
import { TaskDataType } from '../../type/model';
import CloseIcon from '@mui/icons-material/Close';
import { useEffectSkipFirstRender } from '../../utils/hooks';
import "./TaskListPopover.scss";
import classNames from 'classnames';

type TaskListPopoverProps = {
  className:string,
  anchorRef: React.MutableRefObject<HTMLElement | null>;
  taskList: TaskDataType[];
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
};

const PopoverPosition: PopoverProps['positionOrigin'] = Object.freeze({
  left: 6, // in px
  top: 6,
});

export default function TaskListPopover(props: TaskListPopoverProps) {
  const { anchorRef, isOpen: openSignal, onToggle, taskList,className } = props;
  const [isOpen, setOpen] = useState(false);
  useEffectSkipFirstRender(() => {
    setOpen(openSignal);
  }, [openSignal]);

  useEffectSkipFirstRender(() => {
    onToggle(isOpen);
  }, [isOpen]);

  const rootClassName = classNames("TaskListPopover",className)

  const viewTasks = taskList.map((task, i) => {
    const { title } = task;
    return (
      <div className="TaskListPopover__TaskData" key={i}>
        {title}
      </div>
    );
  });

  const handleClickToClose = () => {
    setOpen(false);
  };

  return (
    <Popover
      className={rootClassName}
      isOpen={isOpen}
      anchorRef={anchorRef}
      positionOrigin={PopoverPosition}
      onOpen={onToggle}
    >
      <div className="TaskListPopover__Header">
        Tasks
        <CloseIcon
          className="TaskListPopover__CloseIcon"
          onClick={handleClickToClose}
        />
      </div>
      <div className="TaskListPopover__Lists">{viewTasks}</div>
    </Popover>
  );
}
