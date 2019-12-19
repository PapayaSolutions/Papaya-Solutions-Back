'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Avatar = require('../models/avatares.model');



router.get('/listar_avatar', function(req, res) {
    Avatar.find(
        function(err, avataresBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se encontraron avatares registrados',
                    err
                }); //json
            } else {
                res.json({
                    resultado: true,
                    avatares: avataresBD
                }); //json
            } //if-else
        } //function
    ); //find
}); //get


//registrar imagen
router.post('/registrar_avatar', function(req, res) {
    let body = req.body;
    let nuevo_avatar = new Avatar({
        nombre: body.nombre,
        URL: body.URL,
        estado: true

    });


    nuevo_avatar.save(
        function(err, avatar) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'El avatar no se pudo registrar, ocurrió el siguiente error',
                    err
                })
            } else {
                res.json({
                    resultado: true,
                    avatar
                })
            }
        });
});

router.post('/habilitar_avatar', function(req, res) {
    let body = req.body;
    Avatar.updateOne({ _id: body._id }, {
            $set: {

                estado: 'true',

            }
        },
        function(error, info) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo habilitar el avatar',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    info: info
                })
            }
        }
    )
});

router.post('/deshabilitar_avatar', function(req, res) {
    let body = req.body;
    Avatar.updateOne({ _id: body._id }, {
            $set: {

                estado: 'false',

            }
        },
        function(error, info) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo deshabilitar el avatar',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    info: info
                })
            }
        }
    )
});

module.exports = router;