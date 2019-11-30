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

router.get('/listar_recinto_nombre/:nombre', function(req, res) {

    let nombre = req.params.nombre;

    Recinto.find({ nombre: nombre },
        function(err, recintos) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se encontraron recintos registrados con ese nombre',
                    err
                }); //json
            } else {
                res.json({
                    resultado: true,
                    recintos: recintos
                }); //json
            } //if-elses
        } //function
    ); //find
}); //get

router.get('/listar_recinto_id/:_id', function(req, res) {

    let _id = req.params._id;

    Recinto.find({ _id: _id },
        function(err, recintos) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se encontraron recintos registrados con ese id',
                    err
                }); //json
            } else {
                res.json({
                    resultado: true,
                    recintos: recintos
                }); //json
            } //if-elses
        } //function
    ); //find
}); //get




module.exports = router;