const Inquiry = require('../models/inquiry.model');
const { INTERNAL_SERVER_ERROR, OK, CREATED } = require('http-status');

class inquiries {
  static async createInquiry(req, res) {
    try {
      const { title, description, user, village, category, cell } =
        req.body;
      const inquiry = await Inquiry.create({
        title,
        description,
        user,
        village,
        cell,
        category,
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
      const { inquiryId, categoryId, cellId, villageId } = req.query;
      const { user: data } = req.userdata;
      const {
        _id: user,
        cell: { _id: cell },
        village: { _id: village },
        role,
      } = data;

      if (inquiryId) {
        const inquiry = await Inquiry.findById(inquiryId)
          .populate({
            path: 'user',
            select: 'name cell village phone category',
          })
          .populate({
            path: 'village',
            select: 'name',
          })
          .populate({
            path: 'cell',
            select: 'name',
          });
        return res.status(OK).json({
          message: 'Inquiry found',
          data: inquiry,
        });
      }
      if (user && role === 'user') {
        const inquiry = await Inquiry.find({
          user: user,
        })
          .populate({
            path: 'user',
            select: 'name cell village phone category',
          })
          .populate({
            path: 'village',
            select: 'name',
          })
          .populate({
            path: 'cell',
            select: 'name',
          });
        return res.status(OK).json({
          message: 'Inquiry found',
          data: inquiry,
        });
      }
      if (cell._id && role === 'cell') {
        const inquiry = await Inquiry.find({
          cell: cell,
        })
          .populate({
            path: 'user',
            select: 'name cell village phone category',
          })
          .populate({
            path: 'village',
            select: 'name',
          })
          .populate({
            path: 'cell',
            select: 'name',
          });
        return res.status(OK).json({
          message: 'Inquiry found',
          data: inquiry,
        });
      }
      if (village && role === 'village') {
        const inquiry = await Inquiry.find({
          village: village,
        })
          .populate({
            path: 'user',
            select: 'name cell village phone category',
          })
          .populate({
            path: 'village',
            select: 'name',
          })
          .populate({
            path: 'cell',
            select: 'name',
          });
        return res.status(OK).json({
          message: 'Inquiry found',
          data: inquiry,
        });
      }
      if (categoryId) {
        const inquiry = await Inquiry.find({
          category: categoryId,
        })
          .populate({
            path: 'user',
            select: 'name cell village phone category',
          })
          .populate({
            path: 'village',
            select: 'name',
          })
          .populate({
            path: 'cell',
            select: 'name',
          });
        return res.status(OK).json({
          message: 'Inquiry found',
          data: inquiry,
        });
      }
      const inquiries = await Inquiry.find()
        .populate({
          path: 'user',
          select: 'name cell village phone category',
        })
        .populate({
          path: 'village',
          select: 'name',
        })
        .populate({
          path: 'cell',
          select: 'name',
        });
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
