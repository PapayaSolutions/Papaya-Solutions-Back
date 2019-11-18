'use strict';

const express = require('express'),
    router = express.Router(),
    Cliente = require('../models/visualizar.model')
const mongoose = require('mongoose');

router.get('/ver-perfil/', function(req, res) {


    let correo_cliente = req.params.correo_cliente;

    Cliente.findOne({ correo_cliente: correo_cliente }, function(err, clienteBD) {
        if (err) {
            return res.json({
                success: false,
                msj: 'No se encontró ningún cliente con ese correo',
                err
            });
        } else {
            return res.json({
                success: true,
                cliente: clienteBD
            });
        }
    })
});
module.exports = router;