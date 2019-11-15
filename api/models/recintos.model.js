'use strict'

//Modelo para  recintos

const mongoose = require('mongoose');
const recintos_schema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true,
        unique: true
    },
    direccion: {
        type: String,
        required: true
    },
    canton: {
        type: String,
        required: true
    },
    provincia: {
        type: String,
        required: true
    },
    distrito: {
        type: String,
        required: true
    },
    capacidad: {
        type: Number,
        required: true
    },
    asientosTradicionales: {
        type: Number,
        required: true
    },
    asientosaccesibilidad: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        required: true
    }



});

///le pasamos como parametros, Modelo, Esquema, nombre de la coleccion en la db
module.exports = mongoose.model('Recinto', recintos_schema, 'recintos');