import AccordionContextProvider from "./AccordionContextProvider";
import "./Accordion.scss"
import { addIndexToAccordionItems } from './AccordionItem';
import AccordionState from "./AccordionState";

type Props = {
  children: JSX.Element[]|JSX.Element;
  className?: string;
  isAlwaysOpen?:boolean,
};

export default function Accordion(props: Props) {
  let { className, children,isAlwaysOpen } = props;
  className = className === undefined ? "Accordion-default" : className;
  isAlwaysOpen = isAlwaysOpen === undefined ? false:isAlwaysOpen;
  const IndexedItems = addIndexToAccordionItems(children);
  const initialState:AccordionState = {
    numberOfItem:0,
    activeItem: -1,
    isAlwaysOpen: isAlwaysOpen
  }
  return (
    <AccordionContextProvider initialState={initialState}>
      <div className={`Accordion ${className}`}>{IndexedItems}</div>
    </AccordionContextProvider>
  );
}

