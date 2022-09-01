import { useRef } from 'react';
import useHeightRecalculateHook from './useHeightRecalculateHook';

type ItemBodyProps = {
  content: JSX.Element;
  isOpen: boolean;
};
export default function AccordionBody(props: ItemBodyProps) {
  const { content, isOpen } = props;
  const ref = useRef(null);
  const height = useHeightRecalculateHook(isOpen, ref);
  const makeShow = () => {
    if (isOpen)
      return {
        height: height,
      };
    return {
      height: 0,
    };
  };

  return (
    <div className={`Accordion__Body`} style={makeShow()}>
      <div className="Accordion__Body__Content" ref={ref}>
        {content}
      </div>
    </div>
  );
}
