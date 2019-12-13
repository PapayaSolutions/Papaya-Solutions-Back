'use strict'

const mongoose = require('mongoose');

const bitacora_schema = new mongoose.Schema({

    tipo: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    fecha: {
        type: String,
        required: true,
    },
    hora: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        required: true,
    }

});


//Model, Schema en que se apoya , nombre de la coleccion en al base de datos
module.exports = mongoose.model('Bitacora', bitacora_schema, 'bitacora');