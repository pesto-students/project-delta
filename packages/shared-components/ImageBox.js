import PropTypes from 'prop-types';
import React from 'react';

export function ImageBoxComponent({ bgUrl, style, ...restProps }) {
  return (
    <div
      style={{
        backgroundImage: `url('${bgUrl}')`,
        backgroundSize: 'cover',
        borderRadius: '50%',
        height: '50px',
        width: '50px',
        ...style,
      }}
      {...restProps}
    />
  );
}

ImageBoxComponent.propTypes = {
  bgUrl: PropTypes.string.isRequired,
  style: PropTypes.shape,
};

ImageBoxComponent.defaultProps = {
  style: {},
};
