const mongoose = require('mongoose');

const villageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cell: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cell',
      required: true,
    },
    leader: {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
    writeConcern: { w: 'majority', j: true, wtimeout: 1000 },
  },
);

const Village = mongoose.model('Village', villageSchema);
module.exports = Village;
