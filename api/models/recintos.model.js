'use strict'

//Modelo para  recintos

const mongoose = require('mongoose');
const recintos_schema = new mongoose.Schema({
    //   codigo: { type: String, required: true, unique: true },

    nombre: {
        type: String,
        required: true,
        unique: true
    }


});

//Modelo en que se apoya, nombre de la conección den la base de datos
//Le pase el nombre de la base de datos, el schema, y la coleccion
module.exports = mongoose.model('papayadb', recintos_schema, 'recintos');