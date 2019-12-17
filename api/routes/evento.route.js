'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Evento = require('../models/eventos.model');



router.get('/listar_evento', function(req, res) {
    Evento.find(
        function(err, eventosBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se encontraron Eventos Registrados con ese ID',
                    err
                }); //json
            } else {
                res.json({
                    resultado: true,
                    eventos: eventosBD
                }); //json
            } //if-else
        } //function
    ); //find
}); //get




//registrar evento
router.post('/registrar-evento', function(req, res) {
    let body = req.body;
    let nuevo_evento = new Evento({
        nombre: body.nombre,
        categoria: body.categoria,
        asistentes_esperados: body.asistentes_esperados,
        cantidad_entradas_restante: body.asistentes_esperados,
        fecha_disponible: body.fecha_disponible,
        hora: body.hora,
        pais_evento: body.pais_evento,
        recinto: body.recinto,
        precio_entrada: body.precio_entrada,
        cantidad_maxima_usuario: body.cantidad_maxima_usuario,
        descripcion: body.descripcion,
        organizador: body.organizador,
        URL_imagen: body.URL_imagen,
        hora: body.hora,
        estado: 'Activo'

    });


    nuevo_evento.save(
        function(err, evento) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'El evento no se pudo registrar, ocurrió el siguiente error',
                    err
                })
            } else {
                res.json({
                    resultado: true,
                    evento
                })
            }
        });
});

router.post('/agregar-fecha', function(req, res) {
    if (req.body.nombre) {
        Evento.update({ nombre: req.body.nombre }, {
                $push: {
                    'fecha_disponible': {
                        fecha: req.body.fecha,
                        hora: req.body.hora,
                        hora_salida: req.body.hora_salida
                    }

                }
            },
            function(error) {
                if (error) {
                    return res.json({
                        success: false,
                        msj: 'No se pudo agregar la fecha',
                        err
                    });
                } else {
                    return res.json({
                        success: true,
                        msj: 'Se agregó correctamente la fecha'
                    });
                }
            }
        )
    } else {
        return res.json({
            success: false,
            msj: 'No se pudo agregar la fecha, por favor verifique que el _id sea correcto'

        });
    }

});

router.get('/listar_evento_id/:_id', function(req, res) {

    let _id = req.params._id;

    Evento.find({ _id: _id },
        function(err, eventosBD) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se encontraron Eventos Registrados con ese ID',
                    err
                }); //json
            } else {
                res.json({
                    resultado: true,
                    eventos: eventosBD
                }); //json
            } //if-elses
        } //function
    ); //find
}); //get 

router.post('/calificar', function(req, res) {
    let body = req.body;

    if (body.cliente_id) {
        Evento.updateOne({ _id: body._id, 'calificaciones.usuario': body.cliente_id }, {
                $set: {

                    'calificaciones.$.calificacion': body.num,

                }
            },
            function(error, info) {
                if (error) {
                    res.json({
                        resultado: false,
                        msg: 'No se pudo calificar el evento',
                        err
                    });
                } else {
                    res.json({
                        resultado: true,
                        msg: 'Evento calificado exitosamente',
                        info: info
                    })
                }
            }
        )
    } else {
        return res.json({
            success: false,
            msj: 'No se pudo calificar el evento, por favor verifique que el cliente_id sea correcto'

        });
    }

});
router.post('/comentar', function(req, res) {
    let body = req.body;

    if (body.cliente_id) {
        Evento.updateOne({ _id: body._id, 'calificaciones.usuario': body.cliente_id }, {
                $set: {
                    'calificaciones.$.comentario': body.comentario,
                }
            },
            function(error, info) {
                if (error) {
                    res.json({
                        resultado: false,
                        msg: 'No se pudo comentar el evento',
                        err
                    });
                } else {
                    res.json({
                        resultado: true,
                        msg: 'Evento comentado exitosamente',
                        info: info
                    })
                }
            }
        )
    } else {
        return res.json({
            success: false,
            msj: 'No se pudo comentar el evento, por favor verifique que el cliente_id sea correcto'

        });
    }

});

router.post('/restar_entradas', function(req, res) {
    let body = req.body;
    Evento.updateOne({ _id: body._id }, {
            $set: {

                cantidad_entradas_restante: body.num,

            }
        },
        function(error, info) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo actualizar el evento',
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

router.post('/agregar_compra', function(req, res) {
    if (req.body._id) {
        Evento.update({ _id: req.body._id }, {
                $push: {
                    'calificaciones': {
                        usuario: req.body.usuario,
                        calificacion: 3,
                        comentario: ''
                    }

                }
            },
            function(error) {
                if (error) {
                    return res.json({
                        success: false,
                        msj: 'No se pudo agregar la compra',
                        err
                    });
                } else {
                    return res.json({
                        success: true,
                        msj: 'Se agregó correctamente la compra'
                    });
                }
            }
        )
    } else {
        return res.json({
            success: false,
            msj: 'No se pudo agregar la fecha, por favor verifique que el _id sea correcto'

        });
    }

});

module.exports = router;