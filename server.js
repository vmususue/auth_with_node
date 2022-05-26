'use strict'

import app from './src/app.js';

app.listen(app.get('port'), () => {
  console.log(`Iniciando Express en el puerto ${app.get('port')}`)
})
