'use strict'

const mongoose = require('mongoose');
const descuento_schema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true },
    descripcion: { type: String, required: false, unique: false },
    porcentaje: { type: Number, required: true },
    estado: { type: String, required: true }
});

//Modelo en que se apoya, nombre de la conección den la base de datos
module.exports = mongoose.model('Descuento', descuento_schema, 'descuentos');