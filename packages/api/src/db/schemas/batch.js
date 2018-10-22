import { Schema } from 'mongoose';

const batchSchema = new Schema({
  city: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },

  batchId: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 1,
  },

  batchNumber: {
    type: Number,
    unique: true,
    required: true,
    min: 1,
    validator: Number.isInteger,
  },

  numberOfDays: {
    type: Number,
    required: true,
    min: 1,
    validator: Number.isInteger,
  },

  startDate: {
    type: Date,
    required: true,
  },

  endDate: {
    type: Date,
    required: true,
  },
});

module.exports = batchSchema;
