import bcrypt from 'bcrypt';

const bcryptPassword = (contraseña) => {
  const salt = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync(contraseña, salt);
  return password;
}

export default bcryptPassword;
