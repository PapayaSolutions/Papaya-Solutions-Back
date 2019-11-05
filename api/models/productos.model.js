'use strict'

const mongoose = require('mongoose');
const producto_schema = new mongoose.Schema(
    {
        codigo: {type: String, required: true, unique: true},
        nombre: {type: String, required: true},
        precio: {type: Number, required: true},
        descripcion: {type: String, required: true},
        estado: {type: String, required: true}
    });

//Modelo en que se apoya, nombre de la conección den la base de datos
module.exports = mongoose.model('Producto', producto_schema, 'productos');