import { Schema } from 'mongoose';
import { isEmail } from 'validator';
import { isPast, differenceInSeconds } from 'date-fns';

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },

  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true, // ensures there is a unique index on this field
    validate: {
      isAsync: false,
      validator: isEmail,
      message: '{VALUE} is not a valid email address',
    },
  },

  sex: {
    type: String,
    enum: ['m', 'f'],
  },

  dob: {
    type: Date,
    validate: {
      isAsync: false,
      validator: isPast,
      message: 'DOB must be in the past',
    },
  },

  profilePicUrl: {
    type: String,
  },

  role: {
    type: String,
    required: true,
    enum: ['student', 'instructor'],
    default: 'student',
  },

  batchId: { // link to 'batches' collection
    type: Schema.Types.ObjectId,
    required: function roleIsStudent() { // this field must be present if role is 'student'
      return this.role === 'student';
    },
  },
});

userSchema.virtual('age').get(function calculateAge() {
  if (this.dob === undefined) {
    return undefined;
  }

  const secondsInYear = 365 * 24 * 60 * 60;
  return (differenceInSeconds(new Date(), this.dob) / secondsInYear);
});

module.exports = userSchema;
