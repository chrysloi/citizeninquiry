const { Router } = require('express');
const inquiry = require('../controllers/inquiry.controller');
const Authenticated = require('../middleware/auth.middleware');

const router = Router();

router.get('/', Authenticated.isAuthenticated, inquiry.getInquiries);
router.post('/', inquiry.createInquiry);
router.patch('/:inquiryId', inquiry.updateInquiry);
router.delete('/:inquiryId', inquiry.deleteInquiry);

module.exports = router;
