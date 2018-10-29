import { Schema } from 'mongoose';

const userExerciseSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  userFirstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },

  batchExerciseId: { // link to 'batch-exercises' collection
    type: Schema.Types.ObjectId,
    required: true,
  },

  batchExerciseName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },

  isCompleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = userExerciseSchema;
