import PropTypes from 'prop-types';

import { DEFAULT_PROFILE_PIC_URLS as pics } from '../../config';

export const userProfilePropType = PropTypes.shape({
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  batchCity: PropTypes.string,
  batchNumber: PropTypes.number,
  batchId: PropTypes.string,
  profilePicUrl: PropTypes.string,
});

export function getAppropriateDefaultProfilePic(sex) {
  if (sex === 'm') return pics.male;
  if (sex === 'f') return pics.female;
  return pics.default;
}
