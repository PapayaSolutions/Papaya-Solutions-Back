'use strict'

const mongoose = require('mongoose');
const descuento_schema = new mongoose.Schema({

    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    edad: { type: Number, required: true },
    genero: { type: String, required: true },
    cedula: { type: Number, required: true },
    provincia: { type: String, required: true },
    canton: { type: String, required: true },
    distrito: { type: String, required: true },
    direccion: { type: String, required: true },
    experiencia: { type: String, required: true },
    estado: { type: String, required: true },
    tipo: { type: String, required: true }
});

//Modelo en que se apoya, nombre de la conección den la base de datos
module.exports = mongoose.model('Organizador', descuento_schema, 'organizador');