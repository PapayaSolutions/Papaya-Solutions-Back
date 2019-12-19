'use strict';

const nodeMailer = require('nodemailer');

const express = require('express'),
    router = express.Router(),
    EncargadoRecinto = require('../models/encargados_recintos.model')
const mongoose = require('mongoose');


const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'papayamishka01@gmail.com',
        pass: 'ebfkmchygtmfowrp',
    }
});

//registrar encargado de recinto
router.post('/registrar-encargado-recinto', function(req, res) {
    let body = req.body;
    let nuevo_encargado_recinto = new EncargadoRecinto({
        nombre: body.nombre,
        numero: body.numero,
        correo: body.correo,
        fecha_nacimiento: body.fecha_nacimiento,
        genero: body.genero,
        contrasena: body.contrasena,
        codigov: body.codigov,
        tipo: 'Encargado de recinto',
        estado: 'Habilitado'
    });


    nuevo_encargado_recinto.save(
        function(err, productoBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'El encargado de recinto no se pudo registrar, ocurrió el siguiente error',
                    err
                })
            } else {

                let mailOptions = {

                    from: 'papayamishka01@gmail.com',
                    to: nuevo_encargado_recinto.correo,
                    subject: 'Bienvenidos a Mishka, su pagína de favorita de eventos.',
                    html: `<!DOCTYPE html>
                    <html lang="en">
                    
                    <head>
                        <meta charset="UTF-8">
                        <title>Verificación de correo eléctronico</title>
                        <link href="https://fonts.googleapis.com/css?family=Raleway|Roboto&display=swap" rel="stylesheet">
                    </head>
                    
                    <body style="
                    font-size: 16px;
                    color: #292c2a;
                    ">
                        <main>
                            <div class="fondo" style="margin: 0 auto;
                            margin-top: 10%;
                            text-align: center;
                            
                            border: 2px solid #f7882f;
                            height: 500px;
                            width: 400px;
                            
                            opacity: 0.9;">
                                <div class="verificacion">
                                    <h1 style="font-size: 20px;
                                    color: #f7882f;
                                    border-bottom: 1px solid #f7882f;">¡Bienvenido a Mishka, ${nuevo_encargado_recinto.nombre} !</h1>
                                </div>
                                <div class="verificacion">
                                    <p style="font-size: 20px;
                                    color: #292c2a;">Gracias por preferir nuestro sistema de ventas de tiquetes para tus eventos favoritos.</p>
                                </div>
                                <div class="verificacion" style="padding: 20px;">
                                    <p style="font-size: 20px;
                                    color: #292c2a;">¡Tu correo ${nuevo_encargado_recinto.correo} ha sido verificados con éxito!</p>
                                    <p style="font-size: 20px;
                                    color: #292c2a;">¡Tu clave temporal es: ${nuevo_encargado_recinto.contrasena} </p>
                                </div>
                                <div>
                                    <a href="http://127.0.0.1:5500/iniciar_sesion.html" style="text-decoration: none;
                                    color: #f7882f;
                                    border: 1px solid #f7882f;
                                    font-size: 22px;
                                    font-weight: 500;
                                    background: #ececec;">Iniciar Sesión</a>
                                </div>
                            </div>
                        </main>
                    </body>
                    
                    </html>`
                };

                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);

                    } else {
                        console.log('Correo enviado', info.response);
                    }
                });

                res.json({
                    resultado: true,
                    productoBD //falta esto
                })
            }
        });
});

//listar encargados de recintos
router.get('/listar-encargados-recintos', function(req, res) {
    EncargadoRecinto.find(
        function(err, encargados_recintos) {
            if (err) {
                res.json({
                    resultado: false,

                    msg: 'No se encontraron encargados de recintos',

                    err
                });
            } else {
                res.json({
                    resultado: true,
                    encargados_recintos: encargados_recintos
                })
            }
        }
    );
});


module.exports = router;