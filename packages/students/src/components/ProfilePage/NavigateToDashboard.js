import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import ArrowBack from '@material-ui/icons/ArrowBack';

const style = {
  display: 'flex',
  alignItems: 'center',
  padding: '20px 10px',
  fontSize: '1.5em',
  color: 'black',
  textDecoration: 'none',
};

export function NavigateToDashboardComponent({ disabled }) {
  if (disabled) {
    return (
      <span className="disabled" style={style}>
        <ArrowBack />
        To dashboard
      </span>
    );
  }

  return (
    <NavLink to="/dashboard" style={style}>
      <ArrowBack />
      To dashboard
    </NavLink>
  );
}

NavigateToDashboardComponent.propTypes = {
  disabled: PropTypes.bool,
};

NavigateToDashboardComponent.defaultProps = {
  disabled: false,
};
