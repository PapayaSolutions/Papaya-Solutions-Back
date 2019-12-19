'use strict'

'use strict'

const mongoose = require('mongoose');
const users_schema = new mongoose.Schema({
    correo: { type: String, required: false, unique: true },
    contrasena: { type: String, required: false, unique: false },
    codigov: { type: String, required: false, unique: false },
    tipo: { type: String, required: true, unique: false },
    estado: { type: String, required: true },
    preferencias: [{
        categoria: {
            type: String,
            required: true,
            unique: false
        }
    }]
});

//Modelo en que se apoya, nombre de la conección den la base de datos
module.exports = mongoose.model('User', users_schema, 'users');