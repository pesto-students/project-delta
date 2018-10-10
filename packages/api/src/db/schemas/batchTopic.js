import { Schema } from 'mongoose';

const batchTopicSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },

  category: {
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

  batchId: { // link to 'batches' collection
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = batchTopicSchema;
