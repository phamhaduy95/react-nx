import { forwardRef, useEffect } from "react";
import { ClickOutSideHandler } from "./ClickOutSideHandler";

type Props = {
  children: JSX.Element;
  onClickOutSide: (e: MouseEvent) => void;
};

/**
 * ClickOutSideWatcher is React component which accepts ref of its direct child then observe any click event that happens outside its child.
 * CLickOutSideWatcher requires its direct child not having any click event handler where there is no event bubbling mechanic. For example  event.stopPropagation() or using Capture mode.
 */
export const ClickOutSideWatcher = forwardRef((props: Props, ref: any) => {
  const { children, onClickOutSide } = props;
  useEffect(() => {
    const element = ref.current;
    if (element === null) return;
      const callback = (e:MouseEvent)=>{
          const point:Pointer = {
              top:e.clientY,
              left:e.clientX
          }
          if (!isPointerInsideElement(point,element)){
              onClickOutSide(e);
          }
      }
      document.addEventListener("click",callback,true);
      return () => {
          document.removeEventListener("click",callback,true);
      };
  }, [ref.current,onClickOutSide]);

  return <>{children}</>;
});

export default ClickOutSideWatcher;

type Pointer = {
  top:number,
  left:number,
}

function isPointerInsideElement(point:Pointer,el:HTMLElement){
    const {top,left,width,height} = el.getBoundingClientRect();
    if(point.left < left) return false;
    if (point.left > left + width) return false;
    if (point.top < top) return false;
    if (point.top > height + top) return false;
    return true;
}