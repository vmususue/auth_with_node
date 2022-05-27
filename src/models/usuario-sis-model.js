
'use strict'

import conn from '../config/connection.cjs'
import queryStrings from '../config/querys.js';


const UserModel = () => { };

UserModel.getAll = async () => {
  try {
    return await conn.query(queryStrings.queryGet);
  } catch (err) {
    return err;
  }
}

UserModel.insert = async (arrayValues) => {
  try {
    console.log(arrayValues)
    return await conn.query(queryStrings.queryPost, arrayValues);
  } catch (err) {
    console.error(err)
    return err;
  }
}

UserModel.getSingle = async (user_id) => {
  try {
    return await conn.query(queryStrings.querySingle, [user_id]);
  } catch (err) {
    return err;
  }
}


export default UserModel;