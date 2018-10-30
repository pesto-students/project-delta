export const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  textField: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'flex',
    padding: '10.5px 14px',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 16,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 2,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
});
