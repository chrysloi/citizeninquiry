const { Router } = require('express');
const inquiry = require('../controllers/inquiry.controller');

const router = Router();

router.get('/', inquiry.getInquiries);
router.post('/', inquiry.createInquiry);
router.patch('/:inquiryId', inquiry.updateInquiry);
router.delete('/:inquiryId', inquiry.deleteInquiry);

module.exports = router;
