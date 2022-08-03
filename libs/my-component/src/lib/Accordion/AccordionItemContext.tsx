import { createContext,useContext } from "react";


type Props = {
  children: JSX.Element | JSX.Element[];
  isItemActive: boolean;
  setItemActive: (isActive: boolean) => void;
};

type AccordionItemContextValue = {
  isItemActive: boolean;
  setItemActive: (isActive: boolean) => void;
} | null;

const AccordionItemContext =
  createContext<AccordionItemContextValue>(null);

export default function AccordionItemContextProvider(props: Props) {
  const { children, isItemActive, setItemActive } = props;
  return (
    <AccordionItemContext.Provider value={{ isItemActive, setItemActive }}>
      {children}
    </AccordionItemContext.Provider>
  );
}

export function useAccordionItemContext() {
  const value = useContext(AccordionItemContext);
  if (!value) throw new Error("item context value is null");
  const {isItemActive,setItemActive} = value;
  return {isItemActive,setItemActive}
}
