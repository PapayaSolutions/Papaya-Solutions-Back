'use strict'

const mongoose = require('mongoose');

const avatar_schema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: false
    },
    URL: {
        type: String,
        required: true,
        unique: true

    },
    estado: {
        type: String,
        required: true,
        unique: false
    }

});


//Model, Schema en que se apoya , nombre de la coleccion en al base de datos
module.exports = mongoose.model('Avatar', avatar_schema, 'avatares');