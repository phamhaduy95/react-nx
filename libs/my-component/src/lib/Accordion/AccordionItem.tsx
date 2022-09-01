import { useEffect, useMemo, useState } from 'react';
import { AccordionHeader } from './AccordionHeader';
import AccordionBody from './AccordionBody';
import { v4 as uuidv4 } from 'uuid';
import { useAccordionStore } from './AccordionStoreProvider';
import classNames from 'classnames';

export type AccordionItemProps = {
  header: string | JSX.Element;
  content: JSX.Element;
};

export function AccordionItem(props: AccordionItemProps) {
  const { header, content } = props;
  const id = useMemo(() => {
    return uuidv4();
  }, []);

  const action = useAccordionStore((state)=>state.action);
  useEffect(()=>{
    action.subscribe(id);
    return ()=>{
      action.unsubscribe(id);
    }
  },[])

  const isOpen = useAccordionStore((state) =>{ 
     const item = state.itemList.find(e=>e.id === id);
      return (item === undefined)?false:item.isOpen;
    });
  
  const itemClassName = classNames(`Accordion__Item`, {
    ['is-open']: isOpen,
  });

  return (
    <div className={itemClassName}>
      <AccordionHeader header={header} id={id} isOpen={isOpen} />
      <AccordionBody content={content} isOpen={isOpen} />
    </div>
  );
}
