
'use strict'

import conn from '../config/connection.cjs'


const UserModel = () => {};

UserModel.getAll = async () => await conn.query('SELECT * FROM usuario_sis');

// console.log(UserModel.getAll.rows);