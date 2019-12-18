'use strict';

const nodeMailer = require('nodemailer');

const express = require('express'),
    router = express.Router(),
    EncargadoRecinto = require('../models/encargados_recintos.model')
const mongoose = require('mongoose');


const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pypsolutionscr@gmail.com',
        pass: '7EjuAF8%01e',
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

                    from: 'pypsolutionscr@gmail.com',
                    to: nuevo_encargado_recinto.correo,
                    subject: 'Bienvenidos a Mishka, su pagína de favorita de eventos.',
                    html: `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <title>Verificación de correo eléctronico</title>
                        <link href="https://fonts.googleapis.com/css?family=Raleway|Roboto&display=swap" rel="stylesheet">
                    </head>
                    <body>
                        <main>
                            <div class="fondo">
                                <div class="verificacion">
                                    <h1>¡Bienvenido a Mishka, ${nuevo_encargado_recinto.nombre} !</h1>
                                </div>
                                <div class="verificacion">
                                    <p>Gracias por preferir nuestro sistema de ventas de tiquetes para tus eventos favoritos.</p>
                                </div>
                                <div class="verificacion">
                                    <p>¡Tu correo ${nuevo_encargado_recinto.correo} ha sido verificados con éxito!</p>
                                    <p>¡Tu clave temporal es: ${nuevo_encargado_recinto.contrasena} </p>
                                </div>
                                <div>  
                                    <button type="button" class="btn" id="btn_registro"> <a href="http://127.0.0.1:5500/iniciar_sesion.html">Iniciar Sesión</a> </button>
                                </div>
                            </div>
                        </main>
                    </body> 
                    </html>
                    <style>
                      body {
                        font-family: 'Roboto', sans-serif;
                        font-size: 16px;
                        color: #292c2a;
                        background-image: url(../img/cover2.jpg);
                        background-size: cover;
                    }
                    
                    h1 {
                        font-size: 20px;
                        color: #ececec;
                        border-bottom: 1px solid #f7882f;
                    }
                    
                    p {
                        font-size: 20px;
                        color: #ececec;
                    }
                    
                    .fondo {
                        margin: 0 auto;
                        margin-top: 10%;
                        text-align: center;
                        background: #292c2a;
                        border: 2px solid #f7882f;
                        height: 400px;
                        width: 400px;
                        border-radius: 1rem;
                        opacity: 0.9;
                    }
                    
                    .verificacion {
                        padding: 20px;
                    }
                    
                    #btn_registro {
                        background: #f7882f;
                        font-size: 14px;
                        letter-spacing: 3px;
                        padding: 10px 25px;
                        border-radius: 10rem;
                        color: #ececec;
                        overflow: hidden;
                        margin-top: 10%;
                    }
                    
                    #btn_registro:hover {
                        background: #ececec;
                        color: #f7882f;
                        border: 1px solid #f7882f;
                        box-sizing: border-box;
                    }
                    
                    a {
                        text-decoration: none;
                        color: #292c2a;
                    }
                    
                    a:hover {
                        color: #f7882f;
                    }
                    </style>`
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