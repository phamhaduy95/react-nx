import List, { ListProps } from '@mui/material/List';
import Stack, { StackProps } from '@mui/material/Stack';
import { styled } from '@mui/system';
import './MaterialSideBar.scss';

/* eslint-disable-next-line */
export interface MaterialSideBarProps {
  children: JSX.Element[] | JSX.Element;
}

const SideBarRoot = styled(Stack)<StackProps>(({ theme }) => ({
  width: '12.5rem',
  maxWidth: '20vw',
  bgColor: 'background.paper',
  border: '1px solid hsla(0,0%,60%,0.5)',
  minHeight: '100vh',
  overflow: "hidden",
  '&.hidden': {
    width:"4rem",
    '& .Material-SideBar__Item': {
      '& .MuiListItemText-root ': {
            display:"hidden"
      },
    },
  },
}));

export function MaterialSideBar(props: MaterialSideBarProps) {
  const { children } = props;

  return (
    <SideBarRoot className="Material-SideBar__Root hidden">
      {children}
    </SideBarRoot>
  );
}

export default MaterialSideBar;
