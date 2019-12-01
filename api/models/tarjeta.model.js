'use strict';

const mongoose = require('mongoose');

const cliente_schema = new mongoose.Schema({

    tarjeta: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true, unique: false },
    codigo: { type: Number, required: true, unique: false },
    estado: { type: String, required: true, unique: false }
})

module.exports = mongoose.model('Cliente', cliente_schema, 'clientes');