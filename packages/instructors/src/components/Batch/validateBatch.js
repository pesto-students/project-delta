import isValid from 'date-fns/is_valid';
import isBefore from 'date-fns/is_before';
import isEmpty from 'validator/lib/isEmpty';

import { BATCH_MSGS } from '../../constants/MSGS';

export const validateBatchInfo = (batchInfo) => {
  let isInfoValid = true;
  let message = '';

  if (isEmpty(batchInfo.batchNumber)) {
    isInfoValid = false;
    message = BATCH_MSGS.BATCH_ID_MISSING;
  } else if (isEmpty(batchInfo.city)) {
    isInfoValid = false;
    message = BATCH_MSGS.CITY_MISSING;
  } else if (batchInfo.numberOfDays < 1) {
    isInfoValid = false;
    message = BATCH_MSGS.DAYS_INVALID;
  } else if (!isValid(batchInfo.startDate)) {
    isInfoValid = false;
    message = BATCH_MSGS.START_DATE_INVALID;
  } else if (!isValid(batchInfo.endDate)) {
    isInfoValid = false;
    message = BATCH_MSGS.END_DATE_INVALID;
  } else if (!isBefore(batchInfo.startDate, batchInfo.endDate)) {
    isInfoValid = false;
    message = BATCH_MSGS.END_DATE_INVALID;
  }

  return { isInfoValid, message };
};
