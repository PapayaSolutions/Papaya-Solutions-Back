'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Carrito = require('../models/carrito.model');


//registrar carrito
router.post('/registrar_carrito', function(req, res) {
    let body = req.body;
    let nuevo_carrito = new Carrito({
        usuario: body._id,

    });

    nuevo_carrito.save(
        function(err, carrito) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'El carrito no se pudo registrar, ocurrió el siguiente error',
                    err
                })
            } else {
                res.json({
                    resultado: true,
                    carrito
                })
            }
        });
});

router.get('/buscar_carrito_usuario/:usuario', function(req, res) {

    let usuario = req.params.usuario;

    Carrito.find({ usuario: usuario },
        function(err, carritosBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se encontraron carritos registrados para ese usuario',
                    err
                }); //json
            } else {
                res.json({
                    resultado: true,
                    carritos: carritosBD
                }); //json
            } //if-elses
        } //function
    ); //find
}); //get 






module.exports = router;