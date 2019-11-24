'use strict';

const express = require('express'),
    router = express.Router(),
    Cliente = require('../models/clientes.model');
//  passport = require('passport');
const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');

//registrar cliente
router.post('/registrar-cliente', function(req, res) {
    let body = req.body;
    let nuevo_cliente = new Cliente({
        p_nombre: body.p_nombre,
        s_nombre: body.s_nombre,
        p_apellido: body.p_apellido,
        s_apellido: body.s_apellido,
        correo_cliente: body.correo_cliente,
        identificacion: body.identificacion,
        f_nacimiento: body.f_nacimiento,
        edad: body.edad,
        genero: body.genero,
        provincia: body.provincia,
        canton: body.canton,
        distrito: body.distrito,
        direccion: body.direccion,
        contrasena: body.contrasena,
        codigov: '123',
        tipo: "Cliente",
        estado: 'activo',
        url_avatar: body.url_avatar
    });


    nuevo_cliente.save(
        function(err, clienteBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'El cliente no se pudo registrar, ocurrió el siguiente error',
                    err
                })
            } else {
                res.json({
                    resultado: true,
                    clienteBD
                })
            }
        });
});


Cliente.validar = function(req, res) {
    Cliente.findOne({ correo_cliente: req.body.correo_cliente }).then(
        function(clienteBD) {
            // El usuario si existe
            console.log(clienteBD);
            if (clienteBD) {
                // La contraseña es correcta
                if (clienteBD.contrasena == req.body.contrasena) {
                    res.json({
                        success: true,
                        clienteBD: clienteBD
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
        Cliente.validar(req, res);
    });


router.get('/listar_clientes', function(req, res) {
    Cliente.find(
        function(err, clientesBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se encontraron clientes registrados',
                    err
                }); //json
            } else {
                res.json({
                    resultado: true,
                    clientes: clientesBD
                }); //json
            } //if-else
        } //function
    ); //find
}); //get

router.get('/listar_clientes_id/:_id', function(req, res) {
    let _id = req.params._id;

    Cliente.find({ _id: _id },
        function(err, clientesBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se encontraron Eventos Registrados con ese ID',
                    err
                }); //json
            } else {
                res.json({
                    resultado: true,
                    clientes: clientesBD
                }); //json
            } //if-elses
        } //function
    ); //find
}); //get



module.exports = router;