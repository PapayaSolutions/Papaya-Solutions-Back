'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Bitacora = require('../models/bitacora.model');



router.get('/listar_bitacora', function(req, res) {
    Bitacora.find(
        function(err, bitacorasBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se encontraron entradas registradas  en la bitácora ',
                    err
                }); //json
            } else {
                res.json({
                    resultado: true,
                    bitacoras: bitacorasBD
                }); //json
            } //if-else
        } //function
    ); //find
}); //get



router.post('/registrar_bitacora', function(req, res) {
    let body = req.body;
    let nueva_bitacora = new Bitacora({
        tipo: body.tipo,
        descripcion: body.descripcion,
        fecha: body.fecha,
        hora: body.hora,
        rol: body.rol

    });


    nueva_bitacora.save(
        function(err, bitacora) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'La entrada en la bitácora no se pudo registrar, ocurrió el siguiente error',
                    err
                })
            } else {
                res.json({
                    resultado: true,
                    bitacora
                })
            }
        });
});

module.exports = router;