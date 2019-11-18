'use strict';

const express = require('express'),
    router = express.Router(),
    Cliente = require('../models/clientes.model')
const mongoose = require('mongoose');

const nodeMailer = require('./nodemailer');
const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pypsolutionscr@gmail.com',
        pass: '7EjuAF8%',
    }
});

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
        estado: 'activo'
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

/*listar poroductos
router.get('/listar-productos', function(req, res){
    Producto.find(
        function(err, productoBD){
            if(err){
                res.json({
                    resultado: false,
                    msg: 'No se encontraron productos',
                    err
                });
            }else{
                res.json({
                    resultado: true,
                    productos: productoBD
                })
            }
        }
    );
});*/

module.exports = router;