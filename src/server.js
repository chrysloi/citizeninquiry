const app = require('./index');
const config = require('./config/config');
const mongoose = require('mongoose');
const currentConfig = config[process.env.NODE_ENV];
const { port } = currentConfig;
const server = app.listen(port, () => {
  mongoose.set('strictQuery', false);
  mongoose
    .connect(currentConfig.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('connected to mongodb');
      console.info('you server is running well 🌎🔥🔥🔥', port);
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = server;
