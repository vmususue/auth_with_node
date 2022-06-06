'use strict'

import UserModel from '../models/usuario-sis-model.js';
import generarJWT from '../helpers/jwt.js';
import { request, response } from 'express';
import { transporter } from '../config/mailer.js';
import bcryptPassword from '../helpers/transform-pass.js'
import bcrypt from 'bcrypt';



const AuthController = () => {};

AuthController.register = async (req, res) => {
    try {
      const { nombres: name, apellidos,
              fecha_nacimiento, id_genero, telefono,
              fecha_registro, estado, correo, contraseña, tipo_acceso: id_acceso } = req.body;

      const arrayValues = [ name, apellidos,
                            fecha_nacimiento, id_genero, telefono,
                            fecha_registro, estado, correo, id_acceso, contraseña  ];

      const userEmail = await UserModel.getSingleEmail(correo);
      if (userEmail.rows[0]) {
        return res.status(400).json({'Message': 'the user with that email already exist'})
      }

      arrayValues[arrayValues.length - 1] = bcryptPassword(contraseña);

      const user =  await UserModel.insert(arrayValues);

      const { id_usuario, nombres, id_tipo_acceso } = user.rows[0];

      const token = generarJWT(id_usuario, nombres, id_tipo_acceso);

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

    const { id_usuario, nombres, id_tipo_acceso } = user.rows[0];

    const token = generarJWT(id_usuario, nombres, id_tipo_acceso);

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

AuthController.refresh = (req = request, res = response) => {

  const { id_usuario, nombres, id_tipo_acceso } = req;
  const token = generarJWT(id_usuario, nombres, id_tipo_acceso);

  res.status(200).json({
    'Message': 'New token generated',
    token
  })
}

AuthController.forgotPassword = async (req, res) => {
  try {
    const { correo } = req.body;

    const user = await UserModel.getSingleEmail(correo);
    console.log(user)
    if (!user.rows[0]) {
      return res.status(400).json({ 'Message': 'the user with that email doesn\'t exist' })
    }

    const { id_usuario, nombres } = user.rows[0];
    const token = generarJWT(id_usuario, nombres);

    await transporter.sendMail({
      from: `"Área de Innovación" <${process.env.EMAIL_USER}>`,
      to: correo,
      subject: "Restablecimiento de contraseña",
      text: `Para recuperar su contraseña ingrese al siguiente link ${process.env.APP_URL}/auth/reset-password?token=${token}`,
      //html: "<b>Hello world?</b>", // html body
    });

    res.status(200).json({
      'Message': 'Check your email',
      token
    })


  } catch (err) {
    console.log(err);
    res.status(500).json({
      'Message': 'Fatal Error'
    })
  }
}

AuthController.resetPassword = async (req, res) => {

  try {

    const { contraseña } = req.body;
    const id_usuario = parseInt(req.id_usuario);
    const password = bcryptPassword(contraseña)
    await UserModel.resetPassword(id_usuario, password);

    res.status(200).json({
      'Message': 'Your password has been changed',

    })
  } catch (error) {
    console.log(err);
    res.status(500).json({
      'Message': 'Fatal Error'
    })
  }

}

export default AuthController;