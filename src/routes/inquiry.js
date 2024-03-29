const { Router } = require('express');
const inquiry = require('../controllers/inquiry.controller');
const Authenticated = require('../middleware/auth.middleware');

const router = Router();

router.get('/', Authenticated.isAuthenticated, inquiry.getInquiries);
router.post('/', inquiry.createInquiry);
router.patch('/:inquiryId', inquiry.updateInquiry);
router.patch('/:inquiryId/resolve', inquiry.resolveInquiry);
router.delete('/:inquiryId', inquiry.deleteInquiry);
router.patch(
  '/support/:inquiryId',
  Authenticated.isAuthenticated,
  inquiry.requestSupport,
);

module.exports = router;
