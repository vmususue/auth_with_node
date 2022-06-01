import jwt from 'jsonwebtoken';

const jwtVerify = (req, res, next) => {
  const tokenHeader = req.header('token');
  if (!tokenHeader) {
    return res.status(401).json({ 'Message': 'The token doesn\' exist' });
  }

  try {
    const payload = jwt.verify(tokenHeader, process.env.KEY_TOKEN_JWT);
    const { id_usuario, nombres } = payload;
    req.id_usuario = id_usuario;
    req.nombres = nombres;
    next();

  } catch (error) {
    res.status(401).json({ 'Message': 'Token error' });
  }
}

export default jwtVerify;
