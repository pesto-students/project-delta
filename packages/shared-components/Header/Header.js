import PropTypes from 'prop-types';
import React from 'react';
import Divider from '@material-ui/core/Divider';

import { HeaderMenuComponent } from './HeaderMenu';
import { ImageBoxComponent } from '../ImageBox';

import './styles.css';
import logo from '../assets/logo.png';
import defaultMenuBg from '../assets/default-profile-pic.jpg';

export class HeaderComponent extends React.Component {
  render() {
    const { isLoggedIn, menuBgUrl } = this.props;

    return (
      <React.Fragment>
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <h1>PROJECT</h1>
            <ImageBoxComponent bgUrl={logo} style={{ borderRadius: '0px', marginLeft: '10px' }} />
          </div>

          {isLoggedIn
            ? <HeaderMenuComponent bgUrl={menuBgUrl} />
            : null}
        </header>
        <Divider />
      </React.Fragment>
    );
  }
}

HeaderComponent.propTypes = {
  isLoggedIn: PropTypes.bool,
  menuBgUrl: PropTypes.string,
};

HeaderComponent.defaultProps = {
  isLoggedIn: false,
  menuBgUrl: defaultMenuBg,
};
