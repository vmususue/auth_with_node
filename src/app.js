'use strict'

import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import morgan from 'morgan';


dotenv.config();
const app = express();
app.set('port', process.env.EXPRESS_PORT || 4000);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

export default app;
