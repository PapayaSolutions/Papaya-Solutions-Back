'use strict';

const nodeMailer = require('nodemailer');

const express = require('express'),
    router = express.Router(),
    Organizador = require('../models/organizador.model')
const mongoose = require('mongoose');

//Credenciales y transporter para envio de correos
const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pypsolutionscr@gmail.com',
        pass: '7EjuAF8%01e',
    }
});

//registrar organizador
router.post('/registrar_organizador', function(req, res) {
    let body = req.body;
    let nuevo_organizador = new Organizador({

        p_nombre: body.p_nombre,
        s_nombre: body.s_nombre,
        p_apellido: body.p_apellido,
        s_apellido: body.s_apellido,
        correo: body.correo,
        genero: body.genero,
        identificacion: body.identificacion,
        nacimiento: body.nacimiento,
        provincia: body.provincia,
        canton: body.canton,
        distrito: body.distrito,
        direccion: body.direccion,
        experiencia: body.experiencia,
        estado: body.estado,
        tipo: body.tipo,

    });

    nuevo_organizador.save(function(err, organizador) {
        if (err) {
            res.json({
                resultado: false,
                msg: 'El organizador no se pudo registrar, ocurrió el siguiente error',
                err
            });
        } else {

            let mailOptions = {

                from: 'pypsolutionscr@gmail.com',
                to: nuevo_organizador.correo,
                subject: 'Bienvenidos a Mishka, su pagína de favorita de eventos.',
                html: `<!DOCTYPE html>
                <html lang="en">
                
                <head>
                    <meta charset="UTF-8">
                    <title>Verificación de correo eléctronico</title>
                    <link href="https://fonts.googleapis.com/css?family=Raleway|Roboto&display=swap" rel="stylesheet">
                </head>
                
                <body class="cuerpo" style="
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
                                border-bottom: 1px solid #f7882f;">¡Bienvenido(a) a Mishka, ${nuevo_organizador.p_nombre} !</h1>
                            </div>
                            <div class="verificacion">
                                <p style="font-size: 20px;
                                color: #292c2a;">Gracias por elegir ser parte de nuestra empresa.</p>
                            </div>
                            <div class="verificacion" style="padding: 20px;">
                                <p style="font-size: 20px;">¡Tu correo ${nuevo_organizador.correo_cliente} ha sido verificado con éxito!</p color: #292c2a;>
                                <p style=" font-size: 20px; color: #292c2a;">Tu código de verifición es: ${body.codigov} </p>
                            </div>
                            <img src="https://res.cloudinary.com/pypsolutionscr/image/upload/v1576607143/mail_img_dqcvsf.png" alt="Nosotros te llevamos" style=" height: 100px; width: 100px; margin-bottom: 5px;">
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
                organizador
            })
        }
    });
});

/*listar poroductos*/
router.get('/listar_organizador', function(req, res) {
    Organizador.find(
        function(err, organizador) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se encontraron organizadores',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    organizador: organizador
                })
            }
        }
    );
});

router.get('/listar_organizador_id', function(req, res) {

    let _id = req.query._id;

    Organizador.findOne({ _id: _id },
        function(err, organizador) {
            if (err) {
                return res.json({
                    resultado: false,
                    msg: 'No se encontraron descuentos registrados con ese ID',
                    err
                }); //json
            } else {
                return res.json({
                    resultado: true,
                    organizador: organizador
                }); //json
            } //if-elses
        } //function
    ); //find
}); //get

module.exports = router;