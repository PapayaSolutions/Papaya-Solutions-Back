const express = require('express'),
    router = express.Router(),
    Cliente = require('../models/clientes.model')
const mongoose = require('mongoose');

//registrar cliente
router.post('/registrar-tarjeta', function(req, res) {
    let body = req.body;
    let nueva_tarjeta = new Tarjeta({
        tarjeta: body.tarjeta,
        nombre: body.nombre,
        codigo: body.codigo,
        vencimiento: body.vencimiento,
        apellido: body.apellido,
        postal: body.postal,
        estado: 'activo'
    });

    nueva_tarjeta.save(
        function(err, clienteBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'La tarjeta no se pudo registrar, ocurrió el siguiente error',
                    err
                })
            } else {
                res.json({
                    resultado: true,
                    clienteBD
                })
            }
        });
});