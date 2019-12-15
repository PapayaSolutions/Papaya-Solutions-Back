'use strict';

const express = require('express'),
    router = express.Router(),
    Admin = require('../models/admin.model')
const mongoose = require('mongoose');

//registrar organizador
router.post('/registrar-admin', function(req, res) {
    let body = req.body;
    let nuevo_admin = new Admin({

        nombre: body.nombre,
        correo: body.correo,
        contrasena: body.contrasena,
        tipo: body.tipo,
        estado: body.estado

    });

    nuevo_admin.save(function(err, admin) {
        if (err) {
            res.json({
                resultado: false,
                msg: 'El admin no se pudo registrar, ocurrió el siguiente error',
                err
            });
        } else {
            res.json({
                resultado: true,
                admin
            })
        }
    });
});

/*listar poroductos*/
router.get('/listar-admin', function(req, res) {
    Admin.find(
        function(err, admin) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se encontraron administradores',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    admin: admin
                })
            }
        }
    );
});

router.get('/listar_admin_id', function(req, res) {

    let _id = req.query._id;

    Admin.findOne({ _id: _id },
        function(err, admin) {
            if (err) {
                return res.json({
                    resultado: false,
                    msg: 'No se encontró admin registrado con ese ID',
                    err
                }); //json
            } else {
                return res.json({
                    resultado: true,
                    admin: admin
                }); //json
            } //if-elses
        } //function
    ); //find
}); //get

router.post('/modificar_admin', function(req, res) {
    let body = req.body;
    Admin.updateOne({ _id: body._id }, {
            $set: {
                correo: body.correo,
                contrasena: body.contrasena,
            }
        },
        function(err, admin) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo modificar el admin',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    admin: admin
                })
            }
        }
    )
});

module.exports = router;