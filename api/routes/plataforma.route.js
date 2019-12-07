'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Plataforma = require('../models/plataforma.model');

router.get('/listar_plataforma', function(req, res) {
    Plataforma.find(
        function(err, plataformaBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se encontro información',
                    err
                }); //json
            } else {
                res.json({
                    resultado: true,
                    plataforma: plataformaBD
                }); //json
            } //if-else
        } //function
    ); //find
}); //get

router.post('/registrar_plataforma', function(req, res) {
    let body = req.body;
    let nuevo_plataforma = new Plataforma({
        nombre: body.nombre,
        razon: body.razon,
        cedula: body.cedula,
        direccion: body.direccion,
        provincia: body.provincia,
        canton: body.canton,
        distrito: body.distrito,
        experiencia: body.experiencia,
        logo: body.logo,
        longitud: body.longitud,
        latitud: body.latitud,
        comision: body.comision,
    });


    nuevo_plataforma.save(
        function(err, plataforma) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'La informacion de la plataforma no se pudo registrar, ocurrió el siguiente error',
                    err
                })
            } else {
                res.json({
                    resultado: true,
                    plataforma
                })
            }
        });
});

router.post('/modificar_plataforma', function(req, res) {
    let body = req.body;
    Plataforma.updateOne({ nombre: body.nombre }, {
            $set: {

                razon: body.razon,
                cedula: body.cedula,
                direccion: body.direccion,
                provincia: body.provincia,
                canton: body.canton,
                distrito: body.distrito,
                experiencia: body.experiencia,
                logo: body.logo,
                longitud: body.longitud,
                latitud: body.latitud,
                comision: body.comision,
            }
        },
        function(error, info) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo modificar la informacion de la plataforma',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    info: info
                })
            }
        }
    )
});


module.exports = router;