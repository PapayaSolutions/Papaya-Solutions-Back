'use strict'

const mongoose = require('mongoose');

const evento_schema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    asistentes_esperados: {
        type: Number,
        required: true
    },
    fecha_disponible: {
        type: String,
        required: true,
        unique: false
    },
    hora: {
        type: String,
        required: true,
        unique: false
    },
    pais_evento: {
        type: String,
        required: true
    },
    recinto: {
        type: String,
        required: true
    },
    precio_entrada: {
        type: Number,
        required: true
    },
    cantidad_maxima_usuario: {
        type: Number
    },
    descripcion: {
        type: String,
        required: false
    },
    URL_imagen: {
        type: String,

    },
    estado: {
        type: String,
        required: true
    }

});

//Model, Schema en que se apoya , nombre de la coleccion en al base de datos
module.exports = mongoose.model('Evento', evento_schema, 'eventos');