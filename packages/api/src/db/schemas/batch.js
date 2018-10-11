import { Schema } from 'mongoose';

const batchSchema = new Schema({
  city: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },

  number: {
    type: Number,
    required: true,
    min: 1,
    validator: Number.isInteger,
  },

  startDate: {
    type: Date,
    required: true,
  },
});

module.exports = batchSchema;
