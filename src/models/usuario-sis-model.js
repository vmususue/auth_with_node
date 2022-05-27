
'use strict'

import conn from '../config/connection.cjs'


const UserModel = () => {};

UserModel.getAll = async () => {
  try {
    return await conn.query('SELECT * FROM usuario_sis');
  } catch (err) {
    return err;
  }
}


// console.log(UserModel.getAll.rows);

export default UserModel;