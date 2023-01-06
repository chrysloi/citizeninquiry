const Comment = require('../models/comment.model');

class comment {
  static async create(req, res) {
    try {
      const { inquiryId } = req.params;
      const { user: data } = req.userdata;
      const comment = await Comment.create({
        inquiry: inquiryId,
        user: data._id,
        comment: req.body.comment,
      });
      return res.status(201).json({
        message: 'Comment created',
        comment,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getComments(req, res) {
    try {
      const { inquiryId } = req.params;
      const comments = await Comment.find({
        inquiry: inquiryId,
      }).populate({
        path: 'user',
        select: 'name role',
      });
      return res.status(200).json({
        message: 'Found Comments',
        data: comments,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async updateComment(req, res) {
    try {
      const { commentId } = req.params;
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        req.body,
        { new: true },
      );
      return res.status(200).json({
        message: 'Comment updated',
        updatedComment,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  static async deleteComment(req, res) {
    try {
      const { commentId } = req.params;
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      await comment.remove();
      return res.status(200).json({ message: 'Comment deleted' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = comment;
