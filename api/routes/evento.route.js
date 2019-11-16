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
        nombre: body.nombre,
        categoria: body.categoria,
        asistentes_esperados: body.asistentes_esperados,
        //fecha_disponible se obtiene por metodo alterno router
        pais_evento: body.pais_evento,
        recinto: body.recinto,
        precio_entrada: body.precio_entrada,
        cantidad_maxima_usuario: body.cantidad_maxima_usuario,
        duracion: body.duracion,
        descripcion: body.descripcion,
        URL_imagen: body.URL_imagen,
        estado: 'Activo'

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

router.post('agregar_fecha', function(req, res) {

    Evento.update({ _id: req.body._id }, {
            $push: {
                'fecha_disponible': {
                    fecha: req.body.fecha
                }
            }
        },
        function(error) {
            if (error) {
                return res.json({
                    success: false,
                    msj: 'No se pudo agregar la fecha',
                    err
                });
            } else {
                return res.json({
                    success: true,
                    msj: 'Se agregó correctamente la fecha'
                });
            }
        }
    )

});

module.exports = router;