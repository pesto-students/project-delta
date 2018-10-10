import { Schema } from 'mongoose';

const userTopicSchema = new Schema({
  // student who submitted their rating on this topic
  userId: { // link to 'users' collection
    type: Schema.Types.ObjectId,
    required: true,
  },

  userName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
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

  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
    validate: Number.isInteger,
  },
});

module.exports = userTopicSchema;
