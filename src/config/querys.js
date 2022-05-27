
const queryStrings = {
  'queryGet': 'SELECT * FROM usuario_sis',
  'queryPost': 'INSERT INTO usuario_sis (id_usuario, nombres, apellidos, fecha_nacimiento, id_genero, telefono, fecha_registro, estado, correo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
  'querySingle': 'SELECT * FROM usuario_sis WHERE id_usuario = $1'
}

export default queryStrings;
