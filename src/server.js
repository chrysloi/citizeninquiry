// import app from './index';
// import config from './config/config';
// import log from './logger';
const app = require('./index');
const config = require('./config/config');
const currentConfig = config[process.env.NODE_ENV];
const { port } = currentConfig;
const server = app.listen(port, () => {
  console.info('you server is running well 🌎🔥🔥🔥', port);
});
module.exports = server;
