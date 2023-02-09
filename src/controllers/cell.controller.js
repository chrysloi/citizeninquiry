const Cell = require('../models/cell.model');
const { INTERNAL_SERVER_ERROR, OK, CREATED } = require('http-status');

class cells {
  static async createCell(req, res) {
    try {
      const { name, leader } = req.body;
      const cell = await Cell.create({
        name,
        leader,
      });
      return res.status(CREATED).json({
        message: 'Cell created successfully',
        data: cell,
      });
    } catch (error) {
      console.log(error);
      return res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        error: error,
      });
    }
  }

  static async getCells(req, res) {
    try {
      const { cellId } = req.query;
      if (cellId) {
        const cell = await Cell.findById(cellId);
        return res.status(OK).json({
          message: 'Cell found',
          data: cell,
        });
      }
      const cells = await Cell.find();
      return res.status(OK).json({
        message: 'Cells found',
        data: cells,
      });
    } catch (error) {
      console.log(error);
      return res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        error: error,
      });
    }
  }

  static async updateCell(req, res) {
    try {
      const { cellId } = req.params;
      const { name, leader } = req.body;
      const cell = await Cell.findById(cellId);
      if (!cell) {
        return res.status(404).json({
          message: 'Cell not found',
        });
      }

      const updatedCell = await Cell.findByIdAndUpdate(
        cellId,
        {
          name,
          leader,
        },
        { new: true },
      );
      return res.status(OK).json({
        message: 'Cell updated',
        data: updatedCell,
      });
    } catch (error) {
      console.log(error);
      return res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        error: error,
      });
    }
  }
}

module.exports = cells;
