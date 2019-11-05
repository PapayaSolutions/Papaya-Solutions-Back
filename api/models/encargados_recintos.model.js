'use strict'

//Modelo para encargados de recintos

const mongoose = require('mongoose');
const encargados_recintos_schema = new mongoose.Schema({
    //   codigo: { type: String, required: true, unique: true },

    nombre: {
        type: String,
        required: true,
        unique: true
    },
    numero: {
        type: Number,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    fechaNacimiento: {
        required: true,
        format: Date
    },
    genero: {
        type: String,
        required: true
    },
    contrasena: {
        type: String
    }

});

//Modelo en que se apoya, nombre de la conección den la base de datos
//Le pase el nombre de la base de datos, el schema, y la coleccion
module.exports = mongoose.model('papayadb', encargados_recintos_schema, 'encargados_recintos');