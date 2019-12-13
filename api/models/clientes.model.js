'use strict'

const mongoose = require('mongoose');
const cliente_schema = new mongoose.Schema({
    p_nombre: { type: String, required: true, unique: false },
    s_nombre: { type: String, required: false },
    p_apellido: { type: String, required: true },
    s_apellido: { type: String, required: false },
    correo_cliente: { type: String, required: true, unique: true },
    identificacion: { type: Number, required: true, unique: true },
    f_nacimiento: { type: Date, required: true, unique: false },
    edad: { type: Number, required: true, unique: false },
    genero: { type: String, required: true, unique: false },
    provincia: { type: String, required: true, unique: false },
    canton: { type: String, required: true, unique: false },
    distrito: { type: String, required: true, unique: false },
    direccion: { type: String, required: true, unique: false },
    contrasena: { type: String, required: false, unique: false },
    codigov: { type: String, required: false, unique: false },
    tipo: { type: String, required: true, unique: false },
    estado: { type: String, required: true },
    url_avatar: { type: String, required: true, unique: false },
    preferencias: [{
        categoria: { type: String, required: true, unique: false }
    }],
    metodos_pago: [{
        tarjeta: { type: Number, required: true, unique: true },
        nombre: { type: String, required: false, unique: false },
        codigo: { type: Number, required: false, unique: true },
        vencimiento: { type: Number, required: false, unique: false },
        apellido: { type: String, required: false, unique: false },
        postal: { type: Number, required: false, unique: false },
        estado: { type: String, required: false }
    }]

});

//Modelo en que se apoya, nombre de la conección den la base de datos
module.exports = mongoose.model('Cliente', cliente_schema, 'clientes');