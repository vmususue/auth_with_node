'use strict'

import express from 'express';
import UserController from '../controllers/user-controller.js'
import jwtVerify from '../middleware/verify-jwt.js';

const userRouter = express.Router();

userRouter
  .get('/users', jwtVerify, UserController.getAll)
  .get('/users/:id', jwtVerify, UserController.getSingle)
  .put('/users/:id', jwtVerify, UserController.updateSingle)
  .delete('/users/:id', jwtVerify, UserController.deleteSingle)

export default userRouter;

