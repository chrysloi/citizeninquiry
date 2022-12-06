/* eslint-disable import/no-mutable-exports */
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
import app from './app.js';
import config from './config/config';
const port = config.port || 2022;
console.log(config);

const server = app.listen(port, async () => {
  console.info(`Listening to port ${port}`);
});

export default server;
