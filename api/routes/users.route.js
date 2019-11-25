'use strict';

const express = require('express'),
    router = express.Router(),
    User = require('../models/users.model');
const mongoose = require('mongoose');

//registrar cliente
router.post('/registrar-user', function(req, res) {
    let body = req.body;
    let nuevo_user = new User({
        correo: body.correo,
        contrasena: body.contrasena,
        codigov: '123',
        tipo: body.tipo,
        estado: 'activo',
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


router.post('/agregar-preferencias', function(req, res) {
    if (req.body.correo) {
        User.update({ correo: req.body.correo }, {
                $push: {
                    'preferencias': {
                        categoria: req.body.categoria
                    }
                }
            },
            function(error) {
                if (error) {
                    return res.json({
                        success: false,
                        msj: 'No se pudo agregar la preferencia',
                        err
                    });
                } else {
                    return res.json({
                        success: true,
                        msj: 'Se agregó correctamente la preferencia'
                    });
                }
            }
        )
    } else {
        return res.json({
            success: false,
            msj: 'No se pudo agregar la preferencia, por favor verifique que el _id sea correcto'

        });
    }

});

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


// router.get('/listar_clientes', function(req, res) {
//     Cliente.find(
//         function(err, clientesBD) {
//             if (err) {
//                 res.json({
//                     resultado: false,
//                     msg: 'No se encontraron clientes registrados',
//                     err
//                 }); //json
//             } else {
//                 res.json({
//                     resultado: true,
//                     clientes: clientesBD
//                 }); //json
//             } //if-else
//         } //function
//     ); //find
// }); //get



module.exports = router;