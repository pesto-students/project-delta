import { Schema } from 'mongoose';

const exerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },

  topicId: { // link to 'topics' collection
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = exerciseSchema;
