'use strict'

const mongoose = require('mongoose');
const organizador_schema = new mongoose.Schema({

    p_nombre: { type: String, required: true },
    s_nombre: { type: String },
    p_apellido: { type: String, required: true },
    s_apellido: { type: String },
    correo: { type: String, required: true, unique: true },
    genero: { type: String, required: true },
    identificacion: { type: Number, required: true },
    nacimiento: { type: Date, required: true, unique: false },
    provincia: { type: String, required: true },
    canton: { type: String, required: true },
    distrito: { type: String, required: true },
    direccion: { type: String, required: true },
    experiencia: { type: String, required: true },
    estado: { type: String, required: true },
    tipo: { type: String, required: true }
});

//Modelo en que se apoya, nombre de la conección den la base de datos
module.exports = mongoose.model('Organizador', organizador_schema, 'organizador');