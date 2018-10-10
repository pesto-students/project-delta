import { Schema } from 'mongoose';

const batchExerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },

  batchTopicId: { // link to 'batch-topics' collection
    type: Schema.Types.ObjectId,
    required: true,
  },

  batchId: { // link to 'batches' collection
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = batchExerciseSchema;
