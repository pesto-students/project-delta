import { Schema } from 'mongoose';

const topicSchema = new Schema({
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

  // id of instructor who created this topic
  userId: { // link to 'users' collection
    type: Schema.Types.ObjectId,
  },
});

module.exports = topicSchema;
