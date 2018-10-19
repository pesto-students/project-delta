import Snackbar from '@material-ui/core/Snackbar';
import React from 'react';

import { NotificationBlock } from './NotificationBlock';

const ErrorSnackBar = ({
  open,
  onClose,
  message,
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
      variant="error"
      message={message}
    />
  </Snackbar>
);

export { ErrorSnackBar };
