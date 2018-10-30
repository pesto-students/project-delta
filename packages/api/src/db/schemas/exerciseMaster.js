import { Schema } from 'mongoose';

const exerciseSchema = new Schema({
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

  topicId: { // link to 'topics' collection
    type: Schema.Types.ObjectId,
    required: true,
  },

  topicName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },

  archive: { // Represent deleted documents
    type: Boolean,
    required: true,
  },
});

module.exports = exerciseSchema;
