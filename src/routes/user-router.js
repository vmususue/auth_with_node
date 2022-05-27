'use strict'

import express from 'express';
import UserController from '../controllers/user-controller.js'

const userRouter = express.Router();

userRouter
  .get('/users', UserController.getAll)
  .post('/users', UserController.insert)


export default userRouter;