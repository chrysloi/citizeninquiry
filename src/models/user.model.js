const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: 'user',
      enum: ['user', 'village', 'cell', 'sector'],
    },
    phone: {
      type: String,
      required: true,
    },
    village: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Village',
      required: false,
    },
    cell: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cell',
      required: false,
    },
  },
  {
    timestamps: true,
    writeConcern: { w: 'majority', j: true, wtimeout: 1000 },
  },
);
const User = mongoose.model('User', userSchema);
module.exports = User;
