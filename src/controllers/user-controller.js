'use strict'

import UserModel from '../models/usuario-sis-model.js';

const UserController = () => {};

UserController.getAll = async (req, res) => {
  try {
    const response = await UserModel.getAll();
    res.status(200).json(response.rows);
  } catch (err) {
    console.error(err);
  }

}

export default UserController;