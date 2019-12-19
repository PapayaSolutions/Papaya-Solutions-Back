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
    fecha_nacimiento: {
        //    required: true,
        format: Date
    },
    genero: {
        type: String,
        required: true
    },
    contrasena: {
        type: String,
    },
    codigov: {
        type: String,
    },
    tipo: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    }


});

//le pasamos como parametros, Modelo, Esquema, nombre de la coleccion en la db
module.exports = mongoose.model('EncargadoRecinto', encargados_recintos_schema, 'encargados_recintos');