'use strict';

const express = require('express'),
    router = express.Router(),
    TipodeEvento = require('../models/tipos_de_evento.model');

//registrar tipos de evento
router.post('/registrar_tipos_de_evento', function(req, res) {
    let body = req.body;
    let nuevo_tipo_de_evento = new TipodeEvento({

        nombre: body.nombre,
        URL: body.URL,
        estado: 'Habilitado'
    });
    nuevo_tipo_de_evento.save(
        function(err, TiposBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'La categoría no se pudo registrar, ocurrió el siguiente error',
                    err
                })
            } else {
                res.json({
                    resultado: true,
                    TiposBD
                })
            }
        });
});
//listar eventos
router.get('/listar_tipos_de_evento', function(req, res) {
    TipodeEvento.find(
        function(err, tiposBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se encontraron categorías de evento',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    tipos: tiposBD
                })
            }
        }
    );

});
//modificar 
router.post('/modificar_tipo_de_evento', function(req, res) {
    let body = req.body;
    TipodeEvento.updateOne({ _id: body._id }, {
            $set: {
                nombre: body.nombre,
                URL: body.URL,
                estado: body.estado,
            }
        },
        function(err, TiposBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo modificar el tipo de evento',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    TiposBD
                })
            }
        }
    )
});
module.exports = router;