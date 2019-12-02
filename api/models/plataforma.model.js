'use strict'

const mongoose = require('mongoose');
const plat_schema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },
    razon: {
        type: String,
        required: true,

    },
    cedula: {
        type: String,
        required: true,

    },
    direccion: {
        type: String,
        required: true
    },
    provincia: {
        type: String,
        required: true
    },
    canton: {
        type: String,
        required: true
    },
    distrito: {
        type: String,
        required: true
    },
    experiencia: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    longitud: {
        type: Number,
        required: true
    },
    latitud: {
        type: Number,
        required: true
    },
    telefonos: [{
        numero: {
            type: String,
            required: true,
            unique: false
        },
        descripcion: {
            type: String,
            required: true,
            unique: false
        }
    }],

});

//Modelo en que se apoya, nombre de la conección den la base de datos
module.exports = mongoose.model('Plataforma', plat_schema, 'plataforma');