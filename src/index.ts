import express from 'express';
import cors from 'cors';
import { config } from './config/environment';
import routes from './routes';
import { errorHandler } from './middleware/error-handler';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});