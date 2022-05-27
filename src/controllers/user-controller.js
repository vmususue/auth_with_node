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

    await UserModel.insert(arrayValues);
    res.status(200).json({'Message': 'User added'});
  } catch (err) {
    console.error(err);
  }
}

UserController.getSingle = async (req, res) => {

  try {
    const user_id = parseInt(req.params.id);
    const user = await UserModel.getSingle(user_id);
    res.status(200).send(user.rows[0]);
  } catch (err) {
    console.error(err);
  }
}

UserController.updateSingle = async (req, res) => {
  try {
    const id_usuario = parseInt(req.params.id);

    const { nombres, apellidos, fecha_nacimiento, id_genero, 
           telefono,  fecha_registro, estado, correo } = req.body;

    const arrayValues = [ id_usuario, nombres, apellidos,
                          fecha_nacimiento, id_genero, telefono,
                          fecha_registro, estado, correo, id_usuario ];

    const response = await UserModel.updateSingle(arrayValues);
    console.log(response);
    res.status(200).json({'Message': 'User updated'});
  } catch (err) {
    console.error(err);
  }
}

UserController.deleteSingle = async (req, res) => {

  try {
    const user_id = parseInt(req.params.id);
    await UserModel.deleteSingle(user_id);
    res.status(200).send({'Message': 'User deleted'});
  } catch (err) {
    console.error(err);
  }
}


export default UserController;
