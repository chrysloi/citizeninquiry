const express = require('express');
const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./documentation');
const router = require('./routes');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.get('/api', (req, res) => {
  res.send({ message: 'welcome to my server' });
});
app.use('/api', router);
app.use('/**', (req, res) => {
  res.json({ error: { status: 404, message: 'Router not found' } });
});
app.use(
  '/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, {
    swaggerOptions: {
      docExpansion: 'none',
      persistAuthorization: true,
    },
  }),
);
module.exports = app;
