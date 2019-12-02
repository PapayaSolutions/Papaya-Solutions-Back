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










module.exports = router;