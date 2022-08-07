import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import ListItem from '@mui/material/ListItem';
import { ListItemButton } from '@mui/material';
interface ListItemLinkProps {
  icon: React.ReactElement;
  primary: string;
  to: string;
}

export function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'>>(
        function Link(itemProps, ref) {
          return (
            <RouterLink
              className="Material-SideBar__Item"
              to={to}
              ref={ref}
              {...itemProps}
              role={undefined}
            />
          );
        }
      ),
    [to]
  );

  return (
    <li>
      <ListItemButton component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItemButton>
    </li>
  );
}
