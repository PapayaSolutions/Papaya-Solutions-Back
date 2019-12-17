'use strict';

const express = require('express'),
    router = express.Router(),
    Organizador = require('../models/organizador.model')
const mongoose = require('mongoose');

//registrar organizador
router.post('/registrar_organizador', function(req, res) {
    let body = req.body;
    let nuevo_organizador = new Organizador({

        p_nombre: body.p_nombre,
        s_nombre: body.s_nombre,
        p_apellido: body.p_apellido,
        s_apellido: body.s_apellido,
        correo: body.correo,
        genero: body.genero,
        identificacion: body.identificacion,
        nacimiento: body.nacimiento,
        provincia: body.provincia,
        canton: body.canton,
        distrito: body.distrito,
        direccion: body.direccion,
        experiencia: body.experiencia,
        estado: body.estado,
        tipo: body.tipo
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

router.get('/listar_organizador_id', function(req, res) {

    let _id = req.query._id;

    Organizador.findOne({ _id: _id },
        function(err, organizador) {
            if (err) {
                return res.json({
                    resultado: false,
                    msg: 'No se encontraron descuentos registrados con ese ID',
                    err
                }); //json
            } else {
                return res.json({
                    resultado: true,
                    organizador: organizador
                }); //json
            } //if-elses
        } //function
    ); //find
}); //get

module.exports = router;