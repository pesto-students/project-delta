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
    unique: true,
  },

  batchExerciseName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },

  batchExerciseDay: {
    type: Number,
    required: true,
    min: 1,
    validator: Number.isInteger,
  },

  batchId: { // link to 'batches' collection
    type: Schema.Types.ObjectId,
    required: true,
  },

  batchTopicId: { // link to 'batch-topics' collection
    type: Schema.Types.ObjectId,
    required: true,
  },

  batchTopicName: {
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
