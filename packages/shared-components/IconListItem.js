import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const Secondary = props => (
  <Typography variant="subheading" internalDeprecatedVariant component="span" {...props} />
);

const Primary = props => <Typography color="textSecondary" {...props} />;

const IconListItem = ({
  icon, primary, secondary, ...props
}) => (
  <ListItem {...props}>
    {icon}
    <ListItemText
      secondary={<Secondary>{primary}</Secondary>}
      primary={<Primary>{secondary}</Primary>}
    />
  </ListItem>
);

export { IconListItem };
