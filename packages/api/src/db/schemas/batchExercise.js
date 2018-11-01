import { Schema } from 'mongoose';

const batchExerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },

  day: {
    type: Number,
    required: true,
    min: 1,
    validator: Number.isInteger,
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

  batchId: { // link to 'batches' collection
    type: Schema.Types.ObjectId,
    required: true,
  },

  masterId: { // link to 'master exercise' collection
    type: Schema.Types.ObjectId,
    required: true,
  },

  archive: { // Represent deleted documents
    type: Boolean,
    required: true,
  },
});

module.exports = batchExerciseSchema;
