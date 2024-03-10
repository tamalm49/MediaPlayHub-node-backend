import dotenv from 'dotenv';
import connectDB from './db.config.js';
import app from './app.js';
import logger from './utils/logger.js';
dotenv.config();
let enviroment = process.env.NODE_ENV;
const port = process.env.PORT;
connectDB()
  .then(() => {
    app.listen(port, () => {
      logger.info(`${enviroment} server is running on ${port}`);
    });
  })
  .catch((err) => {
    process.on('exit', () => {
      logger.error('Mongo db error' + err);
    });
  });
