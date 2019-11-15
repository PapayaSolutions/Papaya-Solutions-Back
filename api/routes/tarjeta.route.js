'use strict';

const express = require('express'),
    router = express.Router(),
    Tarjeta = require('../models/tarjeta.model'),
    mongoose = require('mongoose');

router.post('/registrar-tarjeta', function(req, res) {
    let body = req.body;

    let nueva_tarjeta = new Tarjeta({
        tarjeta: body.tarjeta,
        nombre: body.nombre,
        codigo: body.codigo,
        estado: 'Activo'
    });

    nueva_tarjeta.save(
        function(err, tarjetaDB) {
            if (err) {
                return res.json({
                    success: false,
                    msj: 'La tarjeta no se pudo registrar',
                    err
                });
            } else {
                res.json({
                    success: true,
                    msj: 'La tarjeta se guardó con éxito',
                    tarjetaDB
                });
            }
        }
    );
});