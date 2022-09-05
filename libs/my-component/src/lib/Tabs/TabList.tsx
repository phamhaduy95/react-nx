import { SetStateAction, useEffect, useRef, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import classNames from 'classnames';
import { useTabStore } from './TabStoreProvider';
import { useScrollOnTouchMove } from '../utils/hooks';



type TabListProps = {
  children: React.ReactNode[];
};

export function TabList(props: TabListProps) {
  const { children } = props;
  const ref = useRef<HTMLDivElement>(null);
 
  useScrollOnTouchMove(ref);

  return (
    <div className="Tabs__TabList">
      <TabsControlBackWard viewRef={ref} />
      <div className="Tabs__TabListView" ref={ref}>
        {children}
      </div>
      <TabsControlForward viewRef={ref} />
    </div>
  );
}

type TabControlProps = {
  viewRef: React.MutableRefObject<HTMLElement | null>;
};

function TabsControlBackWard(props: TabControlProps) {
  const { viewRef } = props;
  const [isShowed, setShowed] = useState(false);
  const numberOfTabs = useTabStore((state)=>state.numberOfTabs); 


  useEffect(() => {
    const el = viewRef.current;
    if (el === null) return;
    if (el.scrollLeft === 0) setShowed(false);
    else setShowed(true);
  }, [numberOfTabs]);

  useEffect(() => {
    const el = viewRef.current;
    if (el === null) return;
    const callback = () => {
      if (el.scrollLeft == 0) setShowed(false);
      else setShowed(true);
    };
    el.addEventListener('scroll', callback);
    return () => {
      el.removeEventListener('scroll', callback);
    };
  }, []);

  const handleClickBackWard = (e:React.MouseEvent) => {
    e.preventDefault();
    const el = viewRef.current;
    if (el === null) return;
    el.scrollBy({left:-el.clientWidth,top: 0,behavior:"smooth"});
  };

  const className = classNames('Tabs__Control-backward', {
    ['is-showed']: isShowed,
  });

  return (
    <div className={className} onClick={handleClickBackWard} tabIndex={0}>
      <ArrowBackIosIcon />
    </div>
  );
}

function TabsControlForward(props: TabControlProps) {
  const { viewRef } = props;
  const [isShowed, setShowed] = useState(false);
  const numberOfTabs = useTabStore((state)=>state.numberOfTabs); 
  useEffect(() => {
    const el = viewRef.current;
    if (el === null) return;
    const lastView = el.scrollWidth - el.clientWidth;
    if (el.scrollLeft === lastView) setShowed(false);
    else setShowed(true);
  }, [numberOfTabs]);

  useEffect(() => {
    const el = viewRef.current;
    if (el === null) return;
    const callback = () => {   
        const lastView = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft === lastView) setShowed(false);
        else setShowed(true);
    };
    el.addEventListener('scroll', callback);
    return () => {
      el.removeEventListener('scroll', callback);
    };
  }, []);
  
  const handleClick = (e:React.MouseEvent) => {
    e.preventDefault();
    const el = viewRef.current;
    if (el === null) return;
    el.scrollBy({left:el.clientWidth,top: 0,behavior:"smooth"});
  };
  const className = classNames('Tabs__Control-forward', {
    ['is-showed']: isShowed,
  });

  return (
    <div className={className} onClick={handleClick} tabIndex={0}>
      <ArrowForwardIosIcon />
    </div>
  );
}

