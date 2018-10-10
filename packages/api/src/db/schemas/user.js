import { Schema } from 'mongoose';
import { isEmail } from 'validator';

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
    required: () => this.role === 'student', // this field must be present if role is 'student'
  },
});

module.exports = userSchema;
