'use strict'

const mongoose = require('mongoose');

const evento_schema = new mongoose.Schema({
    evento_id: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true, unique: false },
    fecha: { type: Date, required: true, unique: false },
    recinto: { type: String, required: true, unique: false },
    direccion: { type: String, required: true, unique: false },
    precio: { type: Number, required: true, unique: false },
    categoria: { type: String, required: true, unique: false },
    descripcion: { type: String, required: true, unique: false },
    estado: { type: String, required: true, unique: false },
    organizador: { type: String, required: true, unique: false }

});

//Model, Schema en que se apoya , nombre de la coleccion en al base de datos
module.exports = mongoose.model('Evento', evento_schema, 'eventos');