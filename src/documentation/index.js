const welcome = require('./welcome');
const user = require('./user');

const paths = {
  ...welcome,
  ...user,
};

const config = {
  swagger: '2.0',
  info: {
    title: 'Citzens Inquiry',
    description: 'This is team project',
    version: '1.0.0',
    contact: {
      name: 'Eloi Chrysanthe',
      email: 'eloi.chrysanthe@gmail.com',
      url: process.env.URL,
    },
    license: {
      name: 'Apache 3.0',
      //   url: 'http://www.apache.org/licenses/LICENSE-3.0.html',
    },
  },

  schemes: ['HTTP', 'HTTPS'],

  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },

  servers: [
    {
      url: process.env.URL,
      name: 'DEV',
    },
  ],

  paths,
};
module.exports = config;
