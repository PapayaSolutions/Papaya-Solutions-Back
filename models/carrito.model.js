'use strict'

const mongoose = require('mongoose');

const carrito_schema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true,
        unique: true
    },
    compras: [{
        evento: {
            type: String,
            required: false,
            unique: true
        },
        cantidad: {
            type: String,
            required: false,
            unique: false
        },
        tipo: {
            type: String,
            required: false,
            unique: false
        }
    }],

});


//Model, Schema en que se apoya , nombre de la coleccion en al base de datos
module.exports = mongoose.model('Carrito', carrito_schema, 'carritos');