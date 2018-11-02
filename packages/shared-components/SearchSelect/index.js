import NoSsr from '@material-ui/core/NoSsr';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';

import { components } from './components';
import { styles } from './styles';

const IntegrationReactSelect = ({
  classes,
  theme,
  options,
  value,
  onChange,
  placeholder,
  label,
  noOptions,
}) => {
  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
  };

  return (
    <div className={classes.root}>
      <NoSsr>
        <Select
          classes={classes}
          styles={selectStyles}
          options={options}
          components={components}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          textFieldProps={{
            label,
          }}
          noOptions={noOptions}
        />
      </NoSsr>
    </div>
  );
};

const optionsType = PropTypes.shape({
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
});

IntegrationReactSelect.propTypes = {
  classes: PropTypes.shape().isRequired,
  theme: PropTypes.shape().isRequired,
  value: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string]).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(optionsType).isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  noOptions: PropTypes.string,
};

IntegrationReactSelect.defaultProps = {
  placeholder: 'Select ...',
  label: 'Select',
  noOptions: ' no option',
};

export const SearchSelect = withStyles(styles, { withTheme: true })(IntegrationReactSelect);
