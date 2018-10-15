import React from 'react';
import PropTypes from 'prop-types';

function BoxComponent(props) {
  const { bgUrl, text } = props;

  const boxStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  };

  const boxImgStyles = {
    backgroundImage: `url('${bgUrl}')`,
    backgroundSize: 'cover',
  };

  const boxTextStyles = {
    textAlign: 'center',
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
};

export default BoxComponent;
