import 'dotenv/config';
import express from 'express';
import './database';

const app = express();
const { PORT } = process.env;

app.listen(PORT, () => console.log(`app is running on::${PORT}`));
