import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { switchFocus } from '../../Select/utils';
import { useSwitchFocus } from '../../utils/hooks';
import { useSubMenuStore } from './SubMenuStoreProvider';

type SubMenuTriggerProps = {
  label: string;
  disabled: boolean;
  isHighLighted:boolean;
};

export const SubMenuTrigger = forwardRef<HTMLDivElement, SubMenuTriggerProps>(
  (props, ref) => {
    const { label, disabled,isHighLighted } = props;
    const action = useSubMenuStore((state) => state.action);
    const isPopupOpen = useSubMenuStore((state) => state.isPopupOpen);
    const triggerRef = useRef<HTMLDivElement>(null);
    useSwitchFocus(triggerRef,isHighLighted);

    useImperativeHandle(ref, () => triggerRef.current as HTMLDivElement);
    useEffect(() => {
      if (isPopupOpen) return;
      action.highlightOne(null);
      if (isHighLighted) switchFocus(triggerRef, true);
    }, [isPopupOpen]);

    useEffect(()=>{
     
      if (!isHighLighted) {
    
        action.togglePopup(false)
      }
    },[isHighLighted])

    const handleKeyDown = (e: React.KeyboardEvent) => {
      const key = e.key;
      switch (key) {
        case 'Enter': {
          e.stopPropagation();
          if (disabled) return;
          action.togglePopup(true);
          action.highlightNext();
          return;
        }
        case 'ArrowRight': {
          e.preventDefault();
          e.stopPropagation();
          if (disabled) return;
          action.togglePopup(true);
          action.highlightNext();
          return;
        }
      }
    };

    const handleClick = () => {
      if (disabled) return;
      action.togglePopup(!isPopupOpen);
    };



    return (
      <div
        className="PopupMenu__SubMenu__Trigger"
        tabIndex={-1}
        ref={triggerRef}
        onClick={handleClick}
        onKeyDown={handleKeyDown}

      >
        {label}
      </div>
    );
  }
);
