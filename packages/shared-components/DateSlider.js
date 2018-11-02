import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    margin: '20px 0px',
  },
});

const ScrollableTabs = ({
  classes, value, data, handleChange,
}) => (
  <div className={classes.root}>
    <AppBar position="static" color="default">
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        scrollable
        scrollButtons="auto"
      >
        {data.map(tabData => (
          <Tab key={tabData.value} value={tabData.value} label={tabData.label} />
        ))}
      </Tabs>
    </AppBar>
  </div>
);

const valueType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
const dataType = PropTypes.shape({
  value: valueType.isRequired,
  label: PropTypes.string.isRequired,
});

ScrollableTabs.propTypes = {
  classes: PropTypes.shape().isRequired,
  value: valueType.isRequired,
  data: PropTypes.arrayOf(dataType).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export const DateSlider = withStyles(styles)(ScrollableTabs);
