import { Schema } from 'mongoose';

const userTopicSchema = new Schema({
  // student who submitted their rating on this topic
  userId: { // link to 'users' collection
    type: Schema.Types.ObjectId,
    required: true,
  },

  userFirstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
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

  batchTopicDay: {
    type: Number,
    required: true,
    min: 1,
    validator: Number.isInteger,
  },

  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
    validate: Number.isInteger,
  },
});

module.exports = userTopicSchema;
