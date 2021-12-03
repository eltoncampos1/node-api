import 'reflect-metadata';
import 'dotenv/config';
import './database';
import 'shared/container';
import express from 'express';

import { router } from './routes';

const { PORT } = process.env;

const app = express();
app.use(express.json());

app.use(router);

app.listen(PORT, () => console.log(`app is running on::${PORT}`));
