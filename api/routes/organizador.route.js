'use strict';

const express = require('express'),
    router = express.Router(),
    Organizador = require('../models/organizador.model')
const mongoose = require('mongoose');

//registrar organizador
router.post('/registrar-organizador', function(req, res) {
    let body = req.body;
    let nuevo_organizador = new Organizador({

        nombre: body.nombre,
        correo: body.correo,
        edad: body.edad,
        genero: body.genero,
        cedula: body.cedula,
        provincia: body.provincia,
        canton: body.canton,
        distrito: body.direccion,
        direccion: body.direccion,
        experiencia: body.experiencia,
        estado: body.estado
    });

    nuevo_organizador.save(function(err, organizador) {
        if (err) {
            res.json({
                resultado: false,
                msg: 'El organizador no se pudo registrar, ocurrió el siguiente error',
                err
            });
        } else {
            res.json({
                resultado: true,
                organizador
            })
        }
    });
});

/*listar poroductos*/
router.get('/listar_organizador', function(req, res) {
    Organizador.find(
        function(err, organizador) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se encontraron organizadores',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    organizador: organizador
                })
            }
        }
    );
});
module.exports = router;