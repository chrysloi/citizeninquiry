const Inquiry = require('../models/inquiry.model');
const { INTERNAL_SERVER_ERROR, OK, CREATED } = require('http-status');
const AfricasTalking = require('africastalking');
const talking = require('../config/config');
const twilio = require('twilio');
const accountSid = 'AC66a626a962b4ab161f5065bfd13c61de';
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

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
          })
          .populate({
            path: 'category',
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
          })
          .populate({
            path: 'category',
            select: 'name',
          });
        return res.status(OK).json({
          message: 'Inquiry found',
          data: inquiry,
        });
      }
      if (cell && role === 'cell') {
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
          })
          .populate({
            path: 'category',
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
          })
          .populate({
            path: 'category',
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
          })
          .populate({
            path: 'category',
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
        })
        .populate({
          path: 'category',
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

  static async resolveInquiry(req, res) {
    try {
      const { inquiryId } = req.params;
      // const status = 'Resolved';
      const inquiry = await Inquiry.findById(inquiryId);
      if (!inquiry) {
        return res.status(404).json({
          message: 'Inquiry not found',
        });
      }
      const updated = await Inquiry.findByIdAndUpdate(
        inquiryId,
        { status: 'Resolved' },
        { new: true },
      );
      client.messages
        .create({
          body: `Hello, your inquiry was resolved on ${inquiry.status} level`,
          from: '+17622425909',
          to: '+250787039222',
        })
        .then((message) => console.log(message.sid))
        .catch((err) => console.error(err));

      return res.status(CREATED).json({
        message: 'Inquiry resolved',
        data: 'Resolved',
      });
    } catch (err) {
      return res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        error: err,
      });
    }
  }

  static async requestSupport(req, res) {
    try {
      let updated;
      let message;
      const { inquiryId } = req.params;
      const { user } = req.userdata;
      const { role } = user;
      const inquiry = await Inquiry.findById(inquiryId);
      if (!inquiry) {
        return res.status(404).json({
          message: 'Inquiry not found',
        });
      }
      if (role === 'village') {
        updated = await Inquiry.findByIdAndUpdate(
          inquiryId,
          { status: 'cell', cellSupport: true },
          { new: true },
        );
        message = 'Hello, your inquiry was moved to cell level.';
      }
      if (role === 'cell') {
        updated = await Inquiry.findByIdAndUpdate(
          inquiryId,
          {
            status: 'sector',
            cellSupport: false,
            sectorSupport: true,
          },
          { new: true },
        );
        message = 'Hello, your inquiry was moved to sector level.';
      }
      client.messages
        .create({
          body: message,
          from: '+17622425909',
          to: '+250787039222',
        })
        .then((message) => console.log(message.sid))
        .catch((err) => console.error(err));

      return res.status(CREATED).json({
        message: 'Support requested',
        data: updated,
      });
    } catch (err) {
      return res.status(INTERNAL_SERVER_ERROR).json({
        status: INTERNAL_SERVER_ERROR,
        error: err,
      });
    }
  }
}

module.exports = inquiries;
