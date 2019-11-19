'use strict'

const mongoose = require('mongoose');

const impuesto_schema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    porcentaje: {
        type: Number,
        required: true,
        unique: false

    },
    descripcion: {
        type: String,
        required: false,
        unique: false

    },
    estado: {
        type: String,
        required: true,
        unique: false
    }

});


//Model, Schema en que se apoya , nombre de la coleccion en al base de datos
module.exports = mongoose.model('Impuesto', impuesto_schema, 'impuestos');