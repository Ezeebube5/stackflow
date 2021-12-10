import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { router } from './routes';

// Require express
const app = express();

// compressing api response
app.use(compression());

// logger
app.use(morgan('dev'));

// cors enable
app.use(cors());

// security config
app.use(helmet());


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', router);

export default app;