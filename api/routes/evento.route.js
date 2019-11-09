'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Evento = require('../models/eventos.model');


router.get('/listar_evento', function(req, res) {
    Evento.find(
        function(err, eventosBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se encontraron Eventos Registrados',
                    err
                }); //json
            } else {
                res.json({
                    resultado: true,
                    eventos: eventosBD
                }); //json
            } //if-else
        } //function
    ); //find
}); //get


// IMPORTANTE
module.exports = router;