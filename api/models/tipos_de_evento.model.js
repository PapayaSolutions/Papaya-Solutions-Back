'use strict'

//Modelo para tipos de evento

const mongoose = require('mongoose');
const tipos_de_evento_schema = new mongoose.Schema({
    //   codigo: { type: String, required: true, unique: true },

    nombre: {
        type: String,
        required: true,
        unique: true
    },
    estado: {
        type: String,
        required: true
    }
});

//le pasamos como parametros, Modelo, Esquema, nombre de la coleccion en la db
module.exports = mongoose.model('TiposdeEvento', tipos_de_evento_schema, 'tipos_de_evento');