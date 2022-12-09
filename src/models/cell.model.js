const mongoose = require('mongoose');

const cellSchema = new mongoose.Schema(
  {
    name: {
      type: String,
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

const Cell = mongoose.model('Cell', cellSchema);
module.exports = Cell;
