import jwt from 'jsonwebtoken';

const generarJWT = (id_usuario, nombres, id_tipo_acceso) => {

    const payload = { id_usuario, nombres, tipo_acceso: id_tipo_acceso };

    const token = jwt.sign(payload, process.env.KEY_TOKEN_JWT, {
        expiresIn: '24h',
    }, )

    return token;
};

export default generarJWT;