'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Imagen = require('../models/imagenes.model');



router.get('/listar_imagen', function(req, res) {
    Evento.find(
        function(err, imagenesBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se encontraron Imagenes Registradas',
                    err
                }); //json
            } else {
                res.json({
                    resultado: true,
                    eventos: imagenesBD
                }); //json
            } //if-else
        } //function
    ); //find
}); //get


//registrar imagen
router.post('/registrar_imagen', function(req, res) {
    let body = req.body;
    let nueva_imagen = new Imagen({
        nombre: body.nombre,
        URL: body.URL,
        estado: true

    });


    nueva_imagen.save(
        function(err, imagen) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'La imagen no se pudo registrar, ocurrió el siguiente error',
                    err
                })
            } else {
                res.json({
                    resultado: true,
                    imagen
                })
            }
        });
});

module.exports = router;