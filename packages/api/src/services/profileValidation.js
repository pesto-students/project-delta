import isEmail from 'validator/lib/isEmail';
import Batch from '../db';

const ERR_MSGS = require('../../constants/ERR_MSGS');

function profileValidation(user) {
  if (!Reflect.has(user, 'email')) {
    return { passed: false, msg: ERR_MSGS.noEmail };
  }
  if (!isEmail(user.email)) {
    return { passed: false, msg: ERR_MSGS.invalidEmail };
  }
  if (!Reflect.has(user, 'firstName') || user.firstName.length === 0) {
    return { passed: false, msg: ERR_MSGS.noFirstName };
  }
  if (!Reflect.has(user, 'lastName') || user.lastName.length === 0) {
    return { passed: false, msg: ERR_MSGS.noLastName };
  }
  if (!Reflect.has(user, 'role') || user.role.length === 0) {
    return { passed: false, msg: ERR_MSGS.noRole };
  }
  if (user.role.toLowerCase() === 'student') {
    if (!Reflect.has(user, 'batchId') || user.batchId.length < 24) {
      const batchIdInDB = Batch.findOne({ _id: user.batchId });
      if (!batchIdInDB) {
        return { passed: false, msg: ERR_MSGS.noBatchId };
      }
    }
  }
  return { passed: true, msg: 'passed' };
}

module.exports = profileValidation;
