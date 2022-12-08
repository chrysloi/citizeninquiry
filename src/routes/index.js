import express from 'express';

const router = express.Router();

router.all('/*', (req, res) => {
  res.json({ error: { status: 404, message: 'Router not found' } });
});

export default router;
