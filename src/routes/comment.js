const { Router } = require('express');
const router = Router();
const comment = require('../controllers/comment.controller');
const Authenticated = require('../middleware/auth.middleware');

router.post(
  '/:inquiryId',
  Authenticated.isAuthenticated,
  comment.create,
);
router.get('/:inquiryId', comment.getComments);
router.patch('/:commentId', comment.updateComment);
router.delete('/:commentId', comment.deleteComment);

module.exports = router;
