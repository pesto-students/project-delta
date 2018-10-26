import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import React from 'react';

const Transition = props => <Slide direction="down" {...props} />;

class AlertDialog extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.isLoading && !this.props.isLoading) {
      this.props.handleLoadingComplete();
    }
  }

  render() {
    const {
      isOpen,
      handleClose,
      handleSuccess,
      handleLoadingComplete,
      title,
      content,
      disableBackdrop,
      isLoading,
      successText,
      cancelText,
      ...props
    } = this.props;

    return (
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        disableBackdropClick={disableBackdrop}
        disableEscapeKeyDown={disableBackdrop}
        onClose={handleClose}
        {...props}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {isLoading ? (
            <Button className="primary-text" disabled>
              <CircularProgress color="inherit" size={30} />
            </Button>
          ) : (
            <React.Fragment>
              <Button className="primary-text" onClick={handleClose}>
                { cancelText || 'Cancel' }
              </Button>
              <Button className="primary-text" onClick={handleSuccess}>
                { successText || 'Confirm' }
              </Button>
            </React.Fragment>
          )}
        </DialogActions>
      </Dialog>
    );
  }
}

export { AlertDialog };
