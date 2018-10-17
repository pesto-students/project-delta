import React from 'react';
import PropTypes from 'prop-types';

function BoxComponent({
  bgUrl,
  text,
  additionalBoxStyles,
  additionalBoxImgStyles,
  additionalBoxTextStyles,
}) {
  const boxStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    ...additionalBoxStyles,
  };

  const boxImgStyles = {
    backgroundImage: `url('${bgUrl}')`,
    backgroundSize: 'cover',
    ...additionalBoxImgStyles,
  };

  const boxTextStyles = {
    textAlign: 'center',
    ...additionalBoxTextStyles,
  };

  return (
    <div className="box" style={boxStyles}>
      <div className="box-img" style={boxImgStyles} />
      <p className="box-text" style={boxTextStyles}>{text}</p>
    </div>
  );
}

BoxComponent.propTypes = {
  bgUrl: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  additionalBoxStyles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  additionalBoxImgStyles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  additionalBoxTextStyles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

BoxComponent.defaultProps = {
  additionalBoxStyles: {},
  additionalBoxImgStyles: {},
  additionalBoxTextStyles: {},
};

export default BoxComponent;
