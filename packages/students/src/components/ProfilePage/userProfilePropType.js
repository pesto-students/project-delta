import PropTypes from 'prop-types';

export const userProfilePropType = PropTypes.shape({
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  batchCity: PropTypes.string,
  batchNumber: PropTypes.number,
  batchId: PropTypes.string,
  profilePicUrl: PropTypes.string,
});
