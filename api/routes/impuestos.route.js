'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Impuesto = require('../models/impuestos.model');



router.get('/listar_impuesto', function(req, res) {
    Impuesto.find(
        function(err, impuestosBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se encontraron impuestos registrados',
                    err
                }); //json
            } else {
                res.json({
                    resultado: true,
                    impuestos: impuestosBD
                }); //json
            } //if-else
        } //function
    ); //find
}); //get
//registrar impuesto
router.post('/registrar_impuesto', function(req, res) {
    let body = req.body;
    let nuevo_impuesto = new Impuesto({
        nombre: body.nombre,
        porcentaje: body.porcentaje,
        descripcion: body.descripcion,
        estado: 'Activo'

    });
    nuevo_impuesto.save(
        function(err, impuesto) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'El impuesto no se pudo registrar, ocurrió el siguiente error',
                    err
                })
            } else {
                res.json({
                    resultado: true,
                    impuesto
                })
            }
        });
});
router.post('/modificar_impuesto', function(req, res) {
    let body = req.body;
    Impuesto.updateOne({ _id: body._id }, {
            $set: {
                nombre: body.nombre,
                porcentaje: body.porcentaje,
                descripcion: body.descripcion,
                estado: body.estado,
            }
        },
        function(err, ImpuestosBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo modificar el impuesto',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    ImpuestosBD
                })
            }
        }
    )
});
router.get('/listar_impuesto_id', function(req, res) {

    let _id = req.query._id;

    Impuesto.findOne({ _id: _id },
        function(err, impuestosBD) {
            if (err) {
                return res.json({
                    resultado: false,
                    msg: 'No se encontraron Impuestos registrados con ese ID',
                    err
                }); //json
            } else {
                return res.json({
                    resultado: true,
                    impuestos: impuestosBD
                }); //json
            } //if-elses
        } //function
    ); //find
}); //get


module.exports = router;