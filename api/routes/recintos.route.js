'use strict';

const express = require('express'),
    router = express.Router(),
    Recinto = require('../models/recintos.model')
const mongoose = require('mongoose');

//registrar encargado de recinto
router.post('/registrar-recinto', function(req, res) {
    let body = req.body;
    let nuevo_recinto = new Recinto({
        nombre: body.nombre,
        direccion: body.direccion,
        canton: body.canton,
        provincia: body.provincia,
        distrito: body.distrito,
        capacidad: body.capacidad,
        asientos_tradicionales: body.asientos_tradicionales,
        asientos_accesibilidad: body.asientos_accesibilidad,
        latitud: body.latitud,
        longitud: body.longitud,
        estado: body.estado
    });


    nuevo_recinto.save(
        function(err, productoBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'El recinto no se pudo registrar, ocurrió el siguiente error',
                    err
                })
            } else {
                res.json({
                    resultado: true,
                    productoBD //falta esto
                })
            }
        });
});


//listar poroductos
router.get('/listar-recintos', function(req, res) {
    Recinto.find(
        function(err, recintos) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se encontraron recintos',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    recintos: recintos
                })
            }
        }
    );
});


module.exports = router;