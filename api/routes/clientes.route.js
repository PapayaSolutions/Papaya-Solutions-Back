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
          user: 'papayamishka01@gmail.com',
          pass: 'ebfkmchygtmfowrp',
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
          codigov: body.codigov,
          tipo: "Cliente",
          estado: 'Activo',
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

                      from: 'papayamishka01@gmail.com',
                      to: nuevo_cliente.correo_cliente,
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
                                      border-bottom: 1px solid #f7882f;">¡Bienvenido(a) a Mishka, ${nuevo_cliente.p_nombre} !</h1>
                                  </div>
                                  <div class="verificacion">
                                      <p style="font-size: 20px;
                                      color: #292c2a;">Gracias por preferir nuestro sistema de ventas de tiquetes para tus eventos favoritos.</p>
                                  </div>
                                  <div class="verificacion" style="padding: 20px;">
                                      <p style="font-size: 20px;">¡Tu correo ${nuevo_cliente.correo_cliente} ha sido verificados con éxito!</p color: #292c2a;>
                                      <p style=" font-size: 20px; color: #292c2a;">¡Tu código de verifición es: ${nuevo_cliente.codigov} </p>
                                  </div>
                                  <img src="https://res.cloudinary.com/pypsolutionscr/image/upload/v1576607143/mail_img_dqcvsf.png" alt="Nosotros te llevamos" style=" height: 100px; width: 100px; margin-bottom: 5px;">
                                  <div>
                      
                                      <a href="http://127.0.0.1:5500/ingresar_codigo.html" style="text-decoration: none;
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
                  url_tarjeta: body.url_tarjeta,

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
                      msg: 'No se encontraron clientes Registrados con ese ID',
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
  router.post('/habilitar_tarjeta', function(req, res) {
      let body = req.body;
      Cliente.updateOne({ _id: body._id, 'metodos_pago._id': body.tarjeta_id }, {
              $set: {

                  'metodos_pago.$.estado': 'Activo',
              }
          },
          function(error, info) {
              if (error) {
                  res.json({
                      resultado: false,
                      msg: 'No se pudo habilitar la tarjeta',
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
  router.post('/deshabilitar_tarjeta', function(req, res) {
      let body = req.body;
      Cliente.updateOne({ _id: body._id, 'metodos_pago._id': body.tarjeta_id }, {
              $set: {

                  'metodos_pago.$.estado': 'Inactivo',
              }
          },
          function(error, info) {
              if (error) {
                  res.json({
                      resultado: false,
                      msg: 'No se pudo deshabilitar la tarjeta',
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
  router.post('/enviar_entrada', function(req, res) {
      let body = req.body;
      let mailOptions = {

          from: 'papayamishka01@gmail.com',
          to: body.correo,
          subject: 'Aquí esta tu entrada, Míshka te lleva.',
          html: `<!DOCTYPE html>
          <html lang="en">
          
          <head>
              <meta charset="UTF-8">
              <title>Entrada a tu evento</title>
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
                                              padding: 20px;
                                              border: 2px solid #f7882f;
                                              height: 750px;
                                              width: 400px;
                                              
                                              opacity: 0.9;">
                      <div class="verificacion">
                          <h1 style="font-size: 20px;
                                                      color: #f7882f;
                                                      border-bottom: 1px solid #f7882f;">¡Gracias por tu compra ${body.nombre}!, acá están tus tiquetes.</h1>
                      </div>
                      <div class="verificacion">
                          <p style="font-size: 20px;
                                                      color: #292c2a;">Gracias por preferir nuestro sistema de ventas de tiquetes para tus eventos favoritos.</p>
                      </div>
                      <img src="https://res.cloudinary.com/pypsolutionscr/image/upload/v1576618751/mishka_b_alky0w.png" alt="Nosotros te llevamos" style=" height: auto; width: 150px; margin: 5px;">
                      <div>
                      </div>
                      <div class="verificacion" style="padding: 10px;">
                          <p style="font-size: 20px; color: #292c2a;">¡Tu compra ha sido realizada con éxito! </p>
                          <img src="${body.imagen}" alt="Nosotros te llevamos" style="  height: 100px; width: 100px; margin: 10px;">
                          <p style="font-size: 35px; color: #f7882f;"> ${body.nombre_evento} </p>
                          <p style="font-size: 30px; color: #292c2a;"> ¢${body.precio} X ${body.count} = ¢${body.total} </p>
                          <p style=" font-size: 20px; color: #292c2a;">¡Más información del evento acá: </p>
                      </div>
          
                      <img src="https://res.cloudinary.com/pypsolutionscr/image/upload/v1576623098/kiuk6crupx9b0a60afqx.png" alt="Nosotros te llevamos" style=" background:#f7882f; height: 100px; width: 100px; margin-bottom: 5px;">
                      <div style=" margin-top: 5px;">
          
                          <a href="http://127.0.0.1:5500/iniciar_sesion.html" style="text-decoration: none;
                                                      color: #f7882f;
                                                      border: 2px solid #f7882f;
                                                      padding: 5px;
                                                      font-size: 22px;
                                                      font-weight: 500;
                                                      margin-top: 5px;
                                                      ">Iniciar Sesión</a>
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
          body
      })

  });


  module.exports = router;