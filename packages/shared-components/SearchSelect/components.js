import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

const NoOptionsMessage = ({ selectProps, innerProps }) => (
  <Typography
    color="textSecondary"
    className={selectProps.classes.noOptionsMessage}
    {...innerProps}
  >
    {selectProps.noOptions}
  </Typography>
);

const inputComponent = ({ inputRef, ...props }) => <div ref={inputRef} {...props} />;

const Control = ({
  selectProps, children, innerProps, innerRef,
}) => (
  <div className={selectProps.classes.valueContainer}>
    <TextField
      fullWidth
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
      className={selectProps.classes.textField}
      InputProps={{
        inputComponent,
        inputProps: {
          className: selectProps.classes.input,
          inputRef: innerRef,
          children,
          ...innerProps,
        },
      }}
      {...selectProps.textFieldProps}
    />
  </div>
);

const Option = ({
  children, innerProps, innerRef, isFocused, isSelected,
}) => (
  <MenuItem
    buttonRef={innerRef}
    selected={isFocused}
    component="div"
    style={{
      fontWeight: isSelected ? 500 : 400,
    }}
    {...innerProps}
  >
    {children}
  </MenuItem>
);

const Placeholder = ({ selectProps, children, innerProps }) => (
  <Typography color="textSecondary" className={selectProps.classes.placeholder} {...innerProps}>
    {children}
  </Typography>
);

const SingleValue = ({ selectProps, children, innerProps }) => (
  <Typography className={selectProps.classes.singleValue} {...innerProps}>
    {children}
  </Typography>
);

const ValueContainer = ({ selectProps, children }) => (
  <div className={selectProps.classes.valueContainer}>{children}</div>
);

ValueContainer.propTypes = {
  selectProps: PropTypes.shape().isRequired,
  children: PropTypes.node.isRequired,
};

const Menu = ({ selectProps, children, innerProps }) => (
  <Paper square className={selectProps.classes.paper} {...innerProps}>
    {children}
  </Paper>
);

export const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};
