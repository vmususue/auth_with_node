'use strict'

const { Pool } = require('pg');


const dbOptions = {
  host: process.env.POSTGRES_HOSTNAME || '',
  port: process.env.POSTGRES_PORT || 5432,
  user: process.env.POSTGRES_USER || '',
  password: process.env.POSTGRES_PASSWORD || '',
  database: process.env.POSTGRES_DATABASE || ''
};

const pool = new Pool(dbOptions);


pool.connect((err) => {
  return (err) ? console.log(`Error al Conectarse a Postgres: ${err.stack}`)
    : console.log(`Conexión establecida con Postgres`);
});


// pool
//   .query('SELECT * FROM usuario_sis')
//   .then(res => console.log(res.rows[0]))
//   .catch(e => console.error(e.stack))

module.exports = { query: (text, params) => pool.query(text, params) }
