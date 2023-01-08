const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    JWT_SECRET: process.env.JWT_SECRET,
    url: process.env.MONGODB_URL,
    port: process.env.PORT,
    token: process.env.ADMIN_TOKEN,
    talking: process.env.TALKING_APIKEY,
  },
  production: {
    JWT_SECRET: process.env.JWT_SECRET,
    url: process.env.MONGODB_URL,
    port: process.env.PORT,
    logging: false,
    talking: process.env.TALKING_APIKEY,
  },
};
