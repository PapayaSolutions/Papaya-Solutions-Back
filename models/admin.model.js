'use strict'

const mongoose = require('mongoose');
const admin_schema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    contrasena: {
        type: String,
        required: true,
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

//Modelo en que se apoya, nombre de la conección den la base de datos
module.exports = mongoose.model('Admin', admin_schema, 'admin');