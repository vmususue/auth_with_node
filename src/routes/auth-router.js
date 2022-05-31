'use strict'

import express from 'express';
import AuthController from '../controllers/auth-controller.js'

const authRouter = express.Router();

authRouter
  .post('/login', AuthController.login)
  .post('/register', AuthController.register)
  .get('/refresh', AuthController.refresh)

export default authRouter;

