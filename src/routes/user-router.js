'use strict'

import express from 'express';
import UserController from '../controllers/user-controller.js'
import jwtVerify from '../middleware/verify-jwt.js';
import { roleVerifyRead, roleVerifyReadSingle } from '../middleware/verify-role.js';

const userRouter = express.Router();

userRouter
  .get('/users', jwtVerify, roleVerifyRead, UserController.getAll)
  .get('/users/:id', jwtVerify, roleVerifyReadSingle, UserController.getSingle)
  .put('/users/:id', jwtVerify, roleVerifyRead, UserController.updateSingle)
  .delete('/users/:id', jwtVerify, roleVerifyRead, UserController.deleteSingle)

export default userRouter;

