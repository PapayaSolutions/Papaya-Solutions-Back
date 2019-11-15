'use strict';

const express = require('express'),
    router = express.Router(),
    TipodeEvento = require('../models/tipos_de_evento.model');
const mongoose = require('mongoose');

//registrar tipos de evento
router.post('/registrar_tipos_de_evento', function(req, res) {
    let body = req.body;
    let nuevo_tipo_de_evento = new TipodeEvento({

        nombre: body.nombre,
        estado: 'activo'
    });
    nuevo_tipo_de_evento.save(
        function(err, productoBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'El producto no se pudo registrar, ocurrió el siguiente error',
                    err
                })
            } else {
                res.json({
                    resultado: true,
                    productoBD
                })
            }
        });
});

//listar eventos
router.get('/listar_tipos_de_evento', function(req, res) {
    TipodeEvento.find(
        function(err, productoBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se encontraron productos',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    productos: productoBD
                })
            }
        }
    );
});

module.exports = router;