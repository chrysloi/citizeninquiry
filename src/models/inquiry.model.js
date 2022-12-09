const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'pending',
      enum: ['pending', 'resolved', 'rejected'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    village: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Village',
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    comments: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      required: false,
    },
  },
  {
    timestamps: true,
    writeConcern: { w: 'majority', j: true, wtimeout: 1000 },
  },
);

const Inquiry = mongoose.model('Inquiry', inquirySchema);
module.exports = Inquiry;
