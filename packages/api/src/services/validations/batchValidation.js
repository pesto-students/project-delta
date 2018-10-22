import isISO8601 from 'validator/lib/isISO8601';

const VALIDATION_ERR_MSGS = require('../../../constants/VALIDATION_ERR_MSGS');

function batchValidation(batch) {
  if (!Reflect.has(batch, 'city')) {
    return { passed: false, msg: VALIDATION_ERR_MSGS.noCity };
  }
  if (!Reflect.has(batch, 'batchId') || batch.batchId.length === 0) {
    return { passed: false, msg: VALIDATION_ERR_MSGS.noBatchId };
  }
  if (!Reflect.has(batch, 'batchNumber') || batch.batchNumber < 1) {
    return { passed: false, msg: VALIDATION_ERR_MSGS.invalidBatchNumber };
  }
  if (!Reflect.has(batch, 'numberOfDays') || batch.numberOfDays < 1) {
    return { passed: false, msg: VALIDATION_ERR_MSGS.invalidNumberOfDays };
  }
  if (!Reflect.has(batch, 'startDate') || !isISO8601(batch.startDate)) {
    return { passed: false, msg: VALIDATION_ERR_MSGS.invalidStartDate };
  }
  return { passed: true, msg: 'passed' };
}

module.exports = batchValidation;
