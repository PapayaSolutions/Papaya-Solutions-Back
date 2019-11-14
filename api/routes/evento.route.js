'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Evento = require('../models/eventos.model');



router.get('/listar_evento/:_id', function(req, res) {

    let _id = req.params._id;

    Evento.find({ _id: _id },
        function(err, eventosBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se encontraron Eventos Registrados con ese ID',
                    err
                }); //json
            } else {
                res.json({
                    resultado: true,
                    evento: eventosBD
                }); //json
            } //if-else
        } //function
    ); //find
}); //get

router.get('/listar_evento2', function(req, res) {

    let _id = req.query._id;

    Evento.find({ _id: _id },
        function(err, eventosBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se encontraron Eventos Registrados con ese ID',
                    err
                }); //json
            } else {
                res.json({
                    resultado: true,
                    evento: eventosBD
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

router.post('/agregar-fecha', function(req, res) {
    if (req.body._id) {
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
    } else {
        return res.json({
            success: false,
            msj: 'No se pudo agregar la fecha, por favor verifique que el _id sea correcto'

        });
    }

});

module.exports = router;