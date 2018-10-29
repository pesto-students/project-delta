import Snackbar from '@material-ui/core/Snackbar';
import React from 'react';

import { NotificationBlock } from './NotificationBlock';

const AlertSnackBar = ({
  open,
  onClose,
  message,
  type,
  ...props
}) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={open}
    autoHideDuration={5000}
    onClose={onClose}
    {...props}
  >
    <NotificationBlock
      onClose={onClose}
      variant={type}
      message={message}
    />
  </Snackbar>
);

export { AlertSnackBar };
