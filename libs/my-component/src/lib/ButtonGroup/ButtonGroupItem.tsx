import React, { useEffect, useState } from "react";
import useButtonGroupContext from "./ButtonGroupContext";

type Props = {
  children: JSX.Element[]|JSX.Element|string;
  index: number;
  active?:boolean;
  onClick?:()=>void;
};

function ButtonGroupItem(props: Props) {
  let { children, index,active,onClick} = props;
  active = (active == undefined)?false:active;
  const { state, action } = useButtonGroupContext();
  const [isActive,setActive] = useState(false);
  const { activeIndex,mandatory,multiple,disabled } = state;
 
  useEffect(()=>{
    if (activeIndex === index) setActive(true);
    else setActive(false)

  },[activeIndex])


  useEffect(() => {
    action.subscribeItem();
    return () => {
      action.unsubscribeItem();
    };
  }, []);


  /** This pice of code controls how the buttonGroupItem is set active by default. If mandatory flag is true but no active flag found in any component then the first button will be automatically make active */
  useEffect(()=>{
    if (!mandatory) return; 
    if (active) {
      action.selectItem(index);
      return
    }
    if (index === 0) {
      action.selectItem(0);
    }

  },[active])
  /**End of section */ 


  const applyActive = () => {
    if (isActive) return "active";
    return "";
  };

  const handleClick = (event: React.MouseEvent) => {
    /** if multiple is true then the item is independently set active without being managed by reducer*/
    if (!multiple) action.selectItem(index);
    else setActive(prev=>!prev);
    if (onClick) onClick(); 
  };

  return (
    <button disabled={disabled} className={`ButtonGroup__Item ${applyActive()}`} onClick={handleClick}>
      {children}
    </button>
  );
}

type WrapperProps ={
  /** if true, then this item will be active by default. When no multiple property is given, the last item that is manually set active, will be made default */
  active?:boolean;
  children: JSX.Element[]|JSX.Element|string;
  onClick?:()=>void;
}

export default function ButtonGroupItemWrapper(props:WrapperProps){
  const {children} = props;
  return <>
    {children}
    </>
}

/** Convert  ButtonGroupItemWrapper components to Real ButtonGroupItem  components with correct order of indices */
export function giveIndexToGroupItems(Items:JSX.Element[]|JSX.Element){
    if (Items instanceof Array){
        return Items.map((item,index)=>{
          const {props} = item;
            return <ButtonGroupItem {...props}  key={index} index={index}/>
        })
    }
    const {props} = Items;
    return <ButtonGroupItem {...props}/>
}