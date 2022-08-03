import { useContext,useEffect } from "react";
import { ReactComponent as Arrow } from "./assets/angle-down.svg";
import { AccordionContext, useAccordionContext } from './AccordionContextProvider';
import { useAccordionItemContext } from './AccordionItemContext';


/* Define ItemHeader */
type ItemHeaderProps = {
  header: ()=>React.ReactNode;
};

export function AccordionHeader(props: ItemHeaderProps) {
  const { header } = props;
  const {isItemActive,setItemActive} = useAccordionItemContext();
  const handleClick = (e?: any) => {
    setItemActive(!isItemActive);
  };

  const rotateArrow = (isActive: boolean) => {
    if (isActive)
      return {
        transform: "rotateX(180deg)",
      };
    return {
      transform: "rotateX(0deg)",
    };
  };

 
  return (
    <button className={`Accordion__Header`} onClick={handleClick}>
      {header()}
      <Arrow
        className="Accordion__Header__Arrow-icon"
        style={rotateArrow(isItemActive)}
      />
    </button>
  );
}
