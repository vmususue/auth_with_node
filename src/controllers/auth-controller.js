'use strict'

import UserModel from '../models/usuario-sis-model.js';
import bcrypt from 'bcrypt';
import generarJWT from '../helpers/jwt.js';

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

}

AuthController.refresh = async (req, res) => {

}

export default AuthController;