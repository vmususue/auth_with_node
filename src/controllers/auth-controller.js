'use strict'

import UserModel from '../models/usuario-sis-model.js';
import bcrypt from 'bcrypt';
import generarJWT from '../helpers/jwt.js';
import { request, response } from 'express';
import jwt from 'jsonwebtoken'

const AuthController = () => {};

AuthController.register = async (req, res) => {
    try {
      const { nombres: name, apellidos,
              fecha_nacimiento, id_genero, telefono,
              fecha_registro, estado, correo, contraseña } = req.body;

      const arrayValues = [ name, apellidos,
                            fecha_nacimiento, id_genero, telefono,
                            fecha_registro, estado, correo, contraseña ];

      const userEmail = await UserModel.getSingleEmail(correo);
      if (userEmail.rows[0]) {
        return res.status(400).json({'Message': 'the user with that email already exist'})
      }

      const salt = bcrypt.genSaltSync(10);
      arrayValues[arrayValues.length - 1] = bcrypt.hashSync(contraseña, salt);

      const user =  await UserModel.insert(arrayValues);

      const { id_usuario, nombres} = user.rows[0];

      const token = generarJWT(id_usuario, nombres);

      res.status(200).json({
        'Message': 'User added',
        token
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        'Message': 'Fatal Error'
      })
    }
}

AuthController.login = async (req, res) => {

  try {
    const { correo, contraseña } = req.body;

    const user = await UserModel.getSingleEmail(correo);
    if (!user.rows[0]) {
      return res.status(400).json({ 'Message': 'the user with that email doesn\'t exist' })
    }

    const validatePass = bcrypt.compareSync(contraseña, user.rows[0].contraseña);
    if (!validatePass) {
      return res.status(400).json({'Message': 'The password is wrong'})
    }

    const { id_usuario, nombres } = user.rows[0];

    const token = generarJWT(id_usuario, nombres);

    res.status(200).json({
      'Message': 'The password is correct',
      token
    })

  } catch (err) {
    console.log(err);
    res.status(500).json({
      'Message': 'Fatal Error'
    })
  }

}

AuthController.refresh = async (req = request, res = response) => {

  const tokenHeader = req.header('token');
  if (!tokenHeader) {
    res.status(401).json({'Message': 'The token doesn\' exist'});
  }

  try {
    const payload = jwt.verify(tokenHeader, process.env.KEY_TOKEN_JWT);
    const { id_usuario, nombres } = payload;
    const token = generarJWT(id_usuario, nombres);

    res.status(200).json({
      'Message': 'New token generated',
      token
    })

  } catch (error) {
    res.status(401).json({ 'Message': 'Token error' });
  }

}

export default AuthController;