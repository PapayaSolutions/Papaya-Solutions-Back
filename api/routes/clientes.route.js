'use strict';

const nodeMailer = require('nodemailer');

const express = require('express'),
    router = express.Router(),
    Cliente = require('../models/clientes.model');
//  passport = require('passport');
const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');

//Credenciales y transporter para envio de correos
const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pypsolutionscr@gmail.com',
        pass: '7EjuAF8%01e',
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
        contrasena: 'pass123',
        codigov: '123',
        tipo: "Cliente",
        estado: 'activo',
        url_avatar: body.url_avatar,
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

                let mailOptions = {

                    from: 'pypsolutionscr@gmail.com',
                    to: nuevo_cliente.correo_cliente,
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
                                    <h1>¡Bienvenido a Mishka, ${nuevo_cliente.p_nombre} !</h1>
                                </div>
                                <div class="verificacion">
                                    <p>Gracias por preferir nuestro sistema de ventas de tiquetes para tus eventos favoritos.</p>
                                </div>
                                <div class="verificacion">
                                    <p>¡Tu correo ${nuevo_cliente.correo_cliente} ha sido verificados con éxito!</p>
                                    <p>¡Tu clave temporal es: ${nuevo_cliente.contrasena} </p>
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
                    clienteBD
                })
            }
        });
});



router.post('/editar_cliente', function(req, res) {
    let body = req.body;
    Cliente.updateOne({ _id: req.body._id }, {
            $set: {

                p_nombre: body.p_nombre,
                s_nombre: body.s_nombre,
                p_apellido: body.p_apellido,
                s_apellido: body.s_apellido,
                correo_cliente: body.correo_cliente,
                identificacion: body.identificacion,
                f_nacimiento: body.f_nacimiento,
                genero: body.genero,
                provincia: body.provincia,
                canton: body.canton,
                distrito: body.distrito,
                direccion: body.direccion,
                url_avatar: body.url_avatar,

            }
        },
        function(error, clientesBD) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo modificar la informacion del usuario',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    clientes: clientesBD
                })
            }
        }
    )
});

// Cliente.validar = function(req, res) {
//     Cliente.findOne({ correo_cliente: req.body.correo_cliente }).then(
//         function(clienteBD) {
//             // El usuario si existe
//             console.log(clienteBD);
//             if (clienteBD) {
//                 // La contraseña es correcta
//                 if (clienteBD.contrasena == req.body.contrasena) {
//                     res.json({
//                         success: true,
//                         clienteBD: clienteBD
//                     });
//                     // La contraseña es incorrecta
//                 } else {
//                     res.json({
//                         success: false
//                     });
//                 }
//                 // El usuario no existe
//             } else {
//                 res.json({
//                     success: false,
//                     msg: 'El usuario no existe'
//                 });
//             }
//         }
//     )
// };

// router.route('/validar_credenciales')
//     .post(function(req, res) {
//         Cliente.validar(req, res);
//     });


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

router.get('/listar_cliente_id/:_id', function(req, res) {
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

router.get('/listar_cliente_mail/:correo_cliente', function(req, res) {
    let correo_cliente = req.params.correo_cliente;

    Cliente.find({ correo_cliente: correo_cliente },
        function(err, clientesBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se encontraron Eventos Registrados con ese mail',
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



router.post('/registrar_tarjeta', function(req, res) {
    if (req.body.email) {
        Cliente.update({ correo_cliente: req.body.email }, {
                $push: {
                    'metodos_pago': {
                        tarjeta: req.body.tarjeta,
                        nombre: req.body.nombre,
                        codigo: req.body.codigo,
                        vencimiento: req.body.vencimiento,
                        apellido: req.body.apellido,
                        postal: req.body.postal,
                        estado: 'Activo'
                    }

                }
            },
            function(error) {
                if (error) {
                    return res.json({
                        success: false,
                        msj: 'La tarjeta no se pudo registrar',
                        err
                    });
                } else {
                    return res.json({
                        success: true,
                        msj: 'La tarjeta se guardó con éxito'
                    });
                }
            }
        )
    } else {
        return res.json({
            success: false,
            msj: 'No se pudo agregar la tarjeta, por favor verifique que el correo sea correcto'

        });
    }

});

module.exports = router;