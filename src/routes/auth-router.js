'use strict'

import express from 'express';
import AuthController from '../controllers/auth-controller.js'
import jwtVerify from '../middleware/verify-jwt.js';

const authRouter = express.Router();

authRouter
  .post('/login', AuthController.login)
  .post('/register', AuthController.register)
  .get('/refresh', jwtVerify, AuthController.refresh)
  .post('/forgot-password', AuthController.forgotPassword)
  .put('/reset-password', jwtVerify, AuthController.resetPassword)

export default authRouter;

