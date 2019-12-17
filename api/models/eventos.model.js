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

    fecha_disponible: [{
        fecha: {
            type: String,
            required: true,
            unique: false
        },
        hora: {
            type: String,
            required: true,
            unique: false
        },
        hora_salida: {
            type: String,
            required: true,
            unique: false
        }
    }],

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
    cantidad_entradas_restante: {
        type: Number
    },
    descripcion: {
        type: String,
        required: false
    },
    URL_imagen: {
        type: String,
    },

    impuestos: [{
        nombre: {
            type: String,
            required: true,
            unique: false
        },
        porcentaje: {
            type: Number,
            required: true,
            unique: false
        }
    }],

    descuentos: [{
        nombre: {
            type: String,
            required: true,
            unique: false
        },
        porcentaje: {
            type: Number,
            required: true,
            unique: false
        }
    }],
    calificaciones: [{
        usuario: {
            type: String,
            required: true,
            unique: true
        },
        calificacion: {
            type: Number,
            required: false,
            unique: false
        },
        comentario: {
            type: String,
            required: false,
            unique: false
        },
        correo: {
            type: String,

        }
    }],
    organizador: {
        type: String
    },

    estado: {
        type: String,
        required: true
    },
    participantes: {
        type: Array,
        default: []
    }

});

//Model, Schema en que se apoya , nombre de la coleccion en al base de datos
module.exports = mongoose.model('Evento', evento_schema, 'eventos');