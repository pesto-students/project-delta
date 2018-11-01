import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React from 'react';

import { ImageBoxComponent } from './ImageBox';

export class HeaderMenuComponent extends React.Component {
  state = { anchorEl: null };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleProfileBtnClick = () => {
    const { handleProfileBtnClick } = this.props;

    this.handleClose();
    handleProfileBtnClick();
  }

  handleLogoutBtnClick = () => {
    const { handleLogoutBtnClick } = this.props;

    this.handleClose();
    handleLogoutBtnClick();
  }

  render() {
    const { anchorEl } = this.state;
    const { bgUrl } = this.props;

    return (
      <div>
        <ImageBoxComponent bgUrl={bgUrl} onClick={this.handleClick} />
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleProfileBtnClick}>Profile</MenuItem>
          <MenuItem onClick={this.handleLogoutBtnClick}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

HeaderMenuComponent.propTypes = {
  bgUrl: PropTypes.string.isRequired,
  handleProfileBtnClick: PropTypes.func.isRequired,
  handleLogoutBtnClick: PropTypes.func.isRequired,
};
