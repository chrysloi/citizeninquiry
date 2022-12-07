import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  development: {
    JWT_SECRET: process.env.JWT_SECRET,
    url: process.env.MONGODB_URL,
    port: process.env.PORT,
    token: process.env.ADMIN_TOKEN,
  },
  production: {
    JWT_SECRET: process.env.JWT_SECRET,
    url: process.env.MONGODB_URL,
    port: process.env.PORT,
    logging: false,
  },
};
