const Village = require('../models/village.model');
const { INTERNAL_SERVER_ERROR, OK, CREATED } = require('http-status');

class villages {
  static async createVillage(req, res) {
    try {
      const { name, cell, leader } = req.body;
      const village = await Village.create({
        name,
        cell,
        leader,
      });
      return res.status(CREATED).json({
        message: 'Village created',
        data: village,
      });
    } catch (error) {
      console.log(error);
      return res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        error: error,
      });
    }
  }

  static async getVillages(req, res) {
    try {
      const { villageId } = req.query;
      if (villageId) {
        const village = await Village.findById(villageId).populate(
          'cell',
        );
        return res.status(OK).json({
          message: 'Village found',
          data: village,
        });
      }
      const villages = await Village.find().populate('cell');
      return res.status(OK).json({
        message: 'Villages found',
        data: villages,
      });
    } catch (error) {
      console.log(error);
      return res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        error: error,
      });
    }
  }

  static async updateVillage(req, res) {
    try {
      const { villageId } = req.params;
      const { name, cell, leader } = req.body;
      const village = await Village.findById(villageId);
      if (!village) {
        return res.status(404).json({
          message: 'Village not found',
        });
      }
      const updatedVillage = await Village.findByIdAndUpdate(
        villageId,
        { name, cell, leader },
        { new: true },
      );
      return res.status(OK).json({
        message: 'Village updated',
        data: updatedVillage,
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

module.exports = villages;
