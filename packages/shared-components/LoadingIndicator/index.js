import React from 'react';
import PropTypes from 'prop-types';

import './rotate.css';

export function LoadingIndicator({ additionalStyles }) {
  return (
    <div style={{
      borderTop: '3px solid gray',
      borderRadius: '50%',
      boxSizing: 'border-box',
      height: '30vh',
      width: '30vh',
      animationName: 'rotate',
      animationDuration: '1s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear',
      ...additionalStyles,
    }}
    />
  );
}

LoadingIndicator.propTypes = {
  additionalStyles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

LoadingIndicator.defaultProps = {
  additionalStyles: {},
};
