import isEmail from 'validator/lib/isEmail';
import { Batch } from '../db';

const { ObjectId } = require('mongoose').Types;
const ERR_MSGS = require('../../constants/ERR_MSGS');

async function profileValidation(user) {
  if (typeof user.email === 'undefined') {
    return { passed: false, msg: ERR_MSGS.noEmail };
  }
  if (typeof user.email !== 'string' || !isEmail(user.email)) {
    return { passed: false, msg: ERR_MSGS.invalidEmail };
  }
  if (typeof user.firstName !== 'string' || user.firstName.length === 0) {
    return { passed: false, msg: ERR_MSGS.noFirstName };
  }
  if (typeof user.lastName !== 'string' || user.lastName.length === 0) {
    return { passed: false, msg: ERR_MSGS.noLastName };
  }
  if (typeof user.role !== 'string' || user.role.length === 0) {
    return { passed: false, msg: ERR_MSGS.noRole };
  }
  if (user.role.toLowerCase() === 'student') {
    if (!(user.batchId instanceof ObjectId)) {
      return { passed: false, msg: ERR_MSGS.noBatchId };
    }
    const batchIdInDB = await Batch.findOne({ _id: user.batchId });
    if (!batchIdInDB) {
      return { passed: false, msg: ERR_MSGS.noBatchId };
    }
  }
  return { passed: true, msg: 'passed' };
}

module.exports = profileValidation;
