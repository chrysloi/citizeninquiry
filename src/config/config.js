const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    JWT_SECRET: process.env.JWT_SECRET,
    url: process.env.MONGODB_URL,
    port: process.env.PORT,
    talking: process.env.TWILIO_AUTH_TOKEN,
  },
  production: {
    JWT_SECRET: process.env.JWT_SECRET,
    url: process.env.MONGODB_URL,
    port: process.env.PORT,
    logging: false,
    talking: process.env.TWILIO_AUTH_TOKEN,
  },
};
