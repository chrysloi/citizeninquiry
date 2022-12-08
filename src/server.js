// import config from './config/config';
const currentConfig = config[process.env.NODE_ENV];
// import log from './logger';
const app = require('./index');
const config = require('./config/config');
const { port } = currentConfig;
const server = app.listen(port, () => {
  console.info('you server is running well 🌎🔥🔥🔥', port);
});
export default server;
