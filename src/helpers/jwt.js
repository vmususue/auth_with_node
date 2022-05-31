import jwt from 'jsonwebtoken';

const generarJWT = (id_usuario, nombres) => {

    const payload = { id_usuario, nombres };

    const token = jwt.sign(payload, process.env.KEY_TOKEN_JWT, {
        expiresIn: '24h',
    }, )

    return token;
};

export default generarJWT;