import { ReactComponent as Arrow } from './assets/angle-down.svg';
import { useAccordionStore } from './AccordionStoreProvider';


/* Define ItemHeader */
type ItemHeaderProps = {
  header: JSX.Element | string;
  id: string;
  isOpen:boolean;
};

export function AccordionHeader(props: ItemHeaderProps) {
  const { header, id,isOpen } = props;
  const action = useAccordionStore((state) => state.action);
  const handleClick = () => {
       action.toggleItem({id,isOpen:!isOpen});
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const key = e.key;
    switch (key) {
      case 'Enter': {
        action.toggleItem({id,isOpen:!isOpen});
        return
      }
      case 'Escape': {
        action.toggleItem({id,isOpen:false});
        return;
      }
    }
  };

  const rotateArrow = () => {
    if (isOpen)
      return {
        transform: 'rotateX(180deg)',
      };
    return {
      transform: 'rotateX(0deg)',
    };
  };

  return (
    <div
      className={`Accordion__Header`}
      onClick={handleClick}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {header}
      <Arrow className="Accordion__Header__Arrow-icon" style={rotateArrow()} />
    </div>
  );
}
