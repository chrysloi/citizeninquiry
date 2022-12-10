const Inquiry = require('../models/inquiry.model');
const { INTERNAL_SERVER_ERROR, OK, CREATED } = require('http-status');

class inquiries {
  static async createInquiry(req, res) {
    try {
      const { title, description, user, village } = req.body;
      const inquiry = await Inquiry.create({
        title,
        description,
        user,
        village,
      });
      return res.status(CREATED).json({
        message: 'Inquiry created',
        data: inquiry,
      });
    } catch (error) {
      console.log(error);
      return res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        error: error,
      });
    }
  }

  static async getInquiries(req, res) {
    try {
      const { inquiryId, userId, villageId, cellId, categoryId } =
        req.query;
      if (inquiryId) {
        const inquiry = await Inquiry.findById(inquiryId).populate(
          'user',
        );
        return res.status(OK).json({
          message: 'Inquiry found',
          data: inquiry,
        });
      }
      if (userId) {
        const inquiry = await Inquiry.findOne({
          user: userId,
        }).populate('user');
        return res.status(OK).json({
          message: 'Inquiry found',
          data: inquiry,
        });
      }
      if (cellId) {
        const inquiry = await Inquiry.findOne({
          cell: cellId,
        }).populate('user');
      }
      if (villageId) {
        const inquiry = await Inquiry.findOne({
          village: villageId,
        }).populate('user');
      }
      if (categoryId) {
        const inquiry = await Inquiry.findOne({
          category: categoryId,
        }).populate('user');
      }
      const inquiries = await Inquiry.find().populate('user');
      return res.status(OK).json({
        message: 'Inquiries found',
        data: inquiries,
      });
    } catch (error) {
      console.log(error);
      return res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        error: error,
      });
    }
  }

  static async updateInquiry(req, res) {
    try {
      const { inquiryId } = req.params;
      const { title, description, status, user, village } = req.body;
      const inquiry = await Inquiry.findById(inquiryId);
      if (!inquiry) {
        return res.status(404).json({
          message: 'Inquiry not found',
        });
      }
      const updatedInquiry = await Inquiry.findByIdAndUpdate(
        inquiryId,
        { title, description, status, user, village },
        { new: true },
      );
      return res.status(OK).json({
        message: 'Inquiry updated',
        data: updatedInquiry,
      });
    } catch (error) {
      console.log(error);
      return res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        error: error,
      });
    }
  }

  static async deleteInquiry(req, res) {
    try {
      const { inquiryId } = req.params;
      const inquiry = await Inquiry.findById(inquiryId);
      if (!inquiry) {
        return res.status(404).json({
          message: 'Inquiry not found',
        });
      }

      await Inquiry.findByIdAnd;
      return res.status(OK).json({
        message: 'Inquiry deleted',
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

module.exports = inquiries;
