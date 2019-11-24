'use strict';

const express = require('express'),
    router = express.Router(),
    Descuento = require('../models/descuento.model')
const mongoose = require('mongoose');

//registrar descuento
router.post('/descuentos', function(req, res) {
    let body = req.body;
    let nuevo_descuento = new Descuento({
        nombre: body.nombre,
        descripcion: body.descripcion,
        porcentaje: body.porcentaje,
        estado: body.estado
    });

    nuevo_descuento.save(function(err, descuentoBD) {
        if (err) {
            res.json({
                resultado: false,
                msg: 'El descuento no se pudo registrar, ocurrió el siguiente error',
                err
            });
        } else {
            res.json({
                resultado: true,
                descuentoBD
            })
        }
    });
});

/*listar poroductos*/
router.get('/listar_descuentos', function(req, res) {
    Descuento.find(
        function(err, descuentoBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se encontraron productos',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    descuentos: descuentoBD
                })
            }
        }
    );
});
module.exports = router;