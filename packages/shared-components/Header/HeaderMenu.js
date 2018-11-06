import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { ImageBoxComponent } from '../ImageBox';
import { removeToken } from '../../shared-utils/services/loginToken';

export class HeaderMenuComponent extends React.Component {
  state = {
    anchorEl: null,
    userWantsOut: false,
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogoutBtnClick = () => {
    removeToken();
    this.setState({ userWantsOut: true });
  }

  render() {
    const { anchorEl, userWantsOut } = this.state;
    const { bgUrl } = this.props;

    if (userWantsOut) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <ImageBoxComponent className="user-menu" bgUrl={bgUrl} onClick={this.handleClick} />
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>
            <Link
              to="/profile"
              style={{
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              View Profile
            </Link>
          </MenuItem>
          <MenuItem onClick={this.handleLogoutBtnClick}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

HeaderMenuComponent.propTypes = {
  bgUrl: PropTypes.string.isRequired,
};
