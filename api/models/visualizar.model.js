'use strict'

const mongoose = require('mongoose');
const cliente_schema = new mongoose.Schema({
    p_nombre: { type: String, required: true, unique: false },
    p_apellido: { type: String, required: true },
    correo_cliente: { type: String, required: false, unique: true },
    f_nacimiento: { type: Date, required: false, unique: false },
    edad: { type: Number, required: false, unique: false },
    genero: { type: String, required: false, unique: false },
    provincia: { type: String, required: false, unique: false },
    canton: { type: String, required: false, unique: false },
    distrito: { type: String, required: false, unique: false },
    direccion: { type: String, required: false, unique: false },
    estado: { type: String, required: true }
});

//Modelo en que se apoya, nombre de la conección den la base de datos
module.exports = mongoose.model('Visualizar', cliente_schema, 'visualizar');