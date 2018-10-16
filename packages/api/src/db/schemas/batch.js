import { Schema } from 'mongoose';

const batchSchema = new Schema({
  city: {
    type: String,
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

  NumberOfDays: {
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
    required: false,
  },
});

module.exports = batchSchema;
