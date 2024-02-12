'use strict';

import express, { Application, Request, Response } from 'express';
import { connectToDatabase } from './config/dbConfig';
const app = express();
const dotenv = require('dotenv');
dotenv.config();
import authController from './controller/AuthController';
import cors from 'cors';

// App
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }))

// Constants
const PORT = 12456;

// Mongo
connectToDatabase;



app.get('/', (req: Request, res: Response) => {
  res.send('Serveur nodemon + mongoose jc node en fonctionnement');
});

app.use('/auth', authController);

app.listen(PORT, () => {
  console.log(`Running on port :${PORT}`);
});


export default app;