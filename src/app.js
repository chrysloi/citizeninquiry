require('dotenv').config({ path: '../.env' });
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

const DB =
  process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/citzens';
const PORT = process.env.PORT || 2022;
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(
  express.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json({ limit: '50mb' }));
app.use('/api', (req, res) => {
  res.send({ message: 'welcome to my server' });
});

app.listen(PORT, async () => {
  mongoose.set('strictQuery', false);
  mongoose
    .connect(DB, {
      useUnifiedTopology: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.info('Connected to MongoDB');
      console.info(`Listening to port ${PORT}`);
    });
});
export default app;
