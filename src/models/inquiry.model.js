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
      default: 'village',
      // enum: ['Pending', 'Resolved', 'Rejected'],
    },
    cellSupport: {
      type: Boolean,
      require: false,
      default: false,
    },
    sectorSupport: {
      type: Boolean,
      require: false,
      default: false,
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
    cell: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cell',
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  {
    timestamps: true,
    writeConcern: { w: 'majority', j: true, wtimeout: 1000 },
  },
);

const Inquiry = mongoose.model('Inquiry', inquirySchema);
module.exports = Inquiry;
