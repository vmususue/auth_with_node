'use strict'

import UserModel from '../models/usuario-sis-model.js';

const UserController = () => {};

UserController.getAll = async (req, res) => {
  try {
    const users = await UserModel.getAll();
    res.status(200).json(users.rows);
  } catch (err) {
    console.error(err);
  }
}

UserController.insert = async (req, res) => {
  try {
    const { id_usuario, nombres, apellidos,
            fecha_nacimiento, id_genero, telefono,
            fecha_registro, estado, correo } = req.body;

    const arrayValues = [ id_usuario, nombres, apellidos,
                          fecha_nacimiento, id_genero, telefono,
                          fecha_registro, estado, correo ];

    const user = await UserModel.insert(arrayValues);
    res.status(200).json({'Message': 'User added'});
  } catch (err) {
    console.error(err);
  }
}

export default UserController;
