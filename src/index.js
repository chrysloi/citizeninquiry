import express from 'express';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
// import swaggerDocument from "./documentation";
// import router from "./routes";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.get('/api', (req, res) => {
  res.send({ message: 'welcome to my server' });
});
// app.use("/api", router);
// app.use(
//   "/api-docs",
//   swaggerUI.serve,
//   swaggerUI.setup(swaggerDocument, {
//     swaggerOptions: {
//       docExpansion: "none",
//       persistAuthorization: true,
//     },
//   })
// );
export default app;
