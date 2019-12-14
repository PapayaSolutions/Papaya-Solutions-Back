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

router.post('/agregar_evento', function(req, res) {
    if (req.body.usuario) {
        Carrito.update({ usuario: req.body.usuario }, {
                $push: {
                    'compras': {
                        evento: req.body.evento,
                        cantidad: req.body.cantidad

                    }

                }
            },
            function(error) {
                if (error) {
                    return res.json({
                        success: false,
                        msj: 'No se pudo agregar el evento',
                        err
                    });
                } else {
                    return res.json({
                        success: true,
                        msj: 'Se agregó correctamente el evento'
                    });
                }
            }
        )
    } else {
        return res.json({
            success: false,
            msj: 'No se pudo agregar el evento, por favor verifique que el _id sea correcto'

        });
    }

});



module.exports = router;