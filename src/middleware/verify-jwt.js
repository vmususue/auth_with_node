import jwt from 'jsonwebtoken';
import UserModel from '../models/usuario-sis-model.js';

const jwtVerify = async (req, res, next) => {
  const tokenHeader = req.header('token');
  if (!tokenHeader) {
    return res.status(401).json({ 'Message': 'The token doesn\' exist' });
  }

  try {
    const payload = jwt.verify(tokenHeader, process.env.KEY_TOKEN_JWT);
    const { id_usuario, nombres, tipo_acceso: id_tipo_acceso } = payload;
    
    const user = await UserModel.getSingle(id_usuario);
    if (!user) {
      return res.status(401).json({
        'Message': 'The user hasn\'t registered'
      });
    }
  
    req.id_tipo_acceso = id_tipo_acceso;
    req.id_usuario = id_usuario;
    req.nombres = nombres;
    next();

  } catch (error) {
    res.status(401).json({ 'Message': 'Token error' });
  }
}

export default jwtVerify;
