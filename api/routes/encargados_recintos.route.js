'use strict';

const express = require('express'),
    router = express.Router(),
    EncargadoRecinto = require('../models/encargados_recintos.model')
const mongoose = require('mongoose');

//registrar encargado de recinto
router.post('/registrar-encargado-recinto', function(req, res) {
    let body = req.body;
    let nuevo_encargado_recinto = new EncargadoRecinto({
        nombre: body.nombre,
        numero: body.numero,
        correo: body.correo,
        fecha_nacimiento: body.fecha_nacimiento,
        genero: body.genero,
        contrasena: body.contrasena,
        codigov: body.codigov,
        tipo: 'Encargado de recinto',
        estado: body.estado
    });


    nuevo_encargado_recinto.save(
        function(err, productoBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'El encargado de recinto no se pudo registrar, ocurrió el siguiente error',
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

//listar encargados de recintos
router.get('/listar-encargados-recintos', function(req, res) {
    EncargadoRecinto.find(
        function(err, encargados_recintos) {
            if (err) {
                res.json({
                    resultado: false,

                    msg: 'No se encontraron encargados de recintos',

                    err
                });
            } else {
                res.json({
                    resultado: true,
                    encargados_recintos: encargados_recintos
                })
            }
        }
    );
});


module.exports = router;