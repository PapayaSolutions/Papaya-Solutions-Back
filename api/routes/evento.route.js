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






//registrar evento
router.post('/registrar-evento', function(req, res) {
    let body = req.body;
    let nuevo_evento = new Evento({
        id: body.id,
        nombre: body.nombre,
        categoria: body.categoria,
        asistentes_esperados: body.asistentes_esperados,
        fecha_disponible: body.fecha_disponible,
        pais_evento: body.pais_evento,
        recinto: body.recinto,
        precio_entrada: body.precio_entrada,
        cantidad_maxima_usuario: body.cantidad_maxima_usuario,
        duracion: body.duracion,
        descripcion: body.descripcion,
        estado: body.estado

    });


    nuevo_evento.save(
        function(err, evento) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'El evento no se pudo registrar, ocurrió el siguiente error',
                    err
                })
            } else {
                res.json({
                    resultado: true,
                    evento
                })
            }
        });
});

module.exports = router;