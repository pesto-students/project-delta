import PropTypes from 'prop-types';
import React from 'react';
import Divider from '@material-ui/core/Divider';

import { HeaderMenuComponent } from './HeaderMenu';
import { ImageBoxComponent } from './ImageBox';

import logo from './assets/logo.png';
import defaultMenuBg from './assets/default-profile-pic.jpg';

export class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: props.isLoggedIn,
    };
  }

  render() {
    const { isLoggedIn } = this.state;
    const { menuBgUrl, handleProfileBtnClick, handleLogoutBtnClick } = this.props;

    return (
      <React.Fragment>
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <h1>Project</h1>
            <ImageBoxComponent bgUrl={logo} style={{ borderRadius: '0px', marginLeft: '10px' }} />
          </div>

          {!isLoggedIn
            ? null
            : (
              <HeaderMenuComponent
                bgUrl={menuBgUrl}
                handleProfileBtnClick={handleProfileBtnClick}
                handleLogoutBtnClick={handleLogoutBtnClick}
              />
            )}
        </header>
        <Divider />
      </React.Fragment>
    );
  }
}

HeaderComponent.propTypes = {
  isLoggedIn: PropTypes.bool,
  menuBgUrl: PropTypes.string,
  handleProfileBtnClick: PropTypes.func,
  handleLogoutBtnClick: PropTypes.func,
};

HeaderComponent.defaultProps = {
  isLoggedIn: false,
  menuBgUrl: defaultMenuBg,
  handleProfileBtnClick: () => undefined,
  handleLogoutBtnClick: () => undefined,
};
