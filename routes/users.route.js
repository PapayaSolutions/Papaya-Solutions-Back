'use strict';

const express = require('express'),
    router = express.Router(),
    User = require('../models/users.model');
const mongoose = require('mongoose');

//registrar user cliente
router.post('/registrar-user-cli', function(req, res) {
    let body = req.body;
    let nuevo_user = new User({
        correo: body.correo,
        contrasena: 'pass123',
        codigov: body.codigov,
        tipo: "Cliente",
        estado: 'Habilitado',
        preferencias: body.preferencias
    });


    nuevo_user.save(
        function(err, userBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'El usuario no se pudo registrar',
                    err
                })
            } else {
                res.json({
                    resultado: true,
                    userBD
                })
            }
        });
});

//registrar user organizador
router.post('/registrar-user-org', function(req, res) {
    let body = req.body;
    let nuevo_user = new User({
        correo: body.correo,
        contrasena: 'pass123',
        codigov: '123',
        tipo: "Organizador",
        estado: 'Habilitado',
        preferencias: body.preferencias
    });


    nuevo_user.save(
        function(err, userBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'El usuario no se pudo registrar',
                    err
                })
            } else {
                res.json({
                    resultado: true,
                    userBD
                })
            }
        });
});

//registrar user encargado
router.post('/registrar-user-enc', function(req, res) {
    let body = req.body;
    let nuevo_user = new User({
        correo: body.correo,
        contrasena: 'pass123',
        codigov: '123',
        tipo: "Encargado",
        estado: 'Habilitado',
        preferencias: body.preferencias
    });


    nuevo_user.save(
        function(err, userBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'El usuario no se pudo registrar',
                    err
                })
            } else {
                res.json({
                    resultado: true,
                    userBD
                })
            }
        });
});


//login
User.validar = function(req, res) {
    User.findOne({ correo: req.body.correo }).then(
        function(userBD) {
            // El usuario si existe
            console.log(userBD);
            if (userBD) {
                // La contraseña es correcta
                if (userBD.contrasena == req.body.contrasena) {
                    res.json({
                        success: true,
                        userBD: userBD
                    });
                    // La contraseña es incorrecta
                } else {
                    res.json({
                        success: false
                    });
                }
                // El usuario no existe
            } else {
                res.json({
                    success: false,
                    msg: 'El usuario no existe'
                });
            }
        }
    )
};

router.route('/validar_credenciales')
    .post(function(req, res) {
        User.validar(req, res);
    });


//codigo
User.validar_codigo = function(req, res) {
    User.findOne({ correo: req.body.correo }).then(
        function(userBD) {
            // El usuario si existe
            console.log(userBD);
            if (userBD) {
                // La contraseña es correcta
                if (userBD.codigov == req.body.codigov) {
                    res.json({
                        success: true,
                        userBD: userBD
                    });
                    // La contraseña es incorrecta
                } else {
                    res.json({
                        success: false
                    });
                }
                // El usuario no existe
            } else {
                res.json({
                    success: false,
                    msg: 'El usuario no existe'
                });
            }
        }
    )
};

router.route('/validar_codigo')
    .post(function(req, res) {
        User.validar_codigo(req, res);
    });

//editar contraseña
router.post('/modificar_contrasena', function(req, res) {
    let body = req.body;
    User.updateOne({ correo: body.correo }, {
            $set: {
                contrasena: body.contrasena
            }
        },
        function(err, userBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo modificar la contraseña',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    userBD
                })
            }
        }
    )
});


//Editar info de estado
router.post('/modificar-estado', function(req, res) {
    let body = req.body;
    User.updateOne({ _id: body._id }, {
            $set: {
                estado: body.estado,
            }
        },
        function(error, info) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo modificar el estado del usuario',
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