'use strict';

const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

//Se declaran todos los accesos de los archivos routes. Will
const EncargadoRecintos = require('./routes/encargados_recintos.route');
const Recintos = require('./routes/recintos.route');
const Organizador = require('./routes/organizador.route');





//Se declaran todos los accesos de los archivos routes Francisco
const Evento = require('./routes/evento.route');
const Avatar = require('./routes/avatar.route');
const Impuesto = require('./routes/impuestos.route');
const Plataforma = require('./routes/plataforma.route');
const Bitacora = require('./routes/bitacora.route');
const Carrito = require('./routes/carrito.route');

//Se declaran todos los accesos de los archivos routes Daniel
const TipodeEvento = require('./routes/tipos_de_evento.route');






//Se declaran todos los accesos de los archivos routes Andres
const Cliente = require('./routes/clientes.route');
const User = require('./routes/users.route');




//Se declaran todos los accesos de los archivos routes Francisco




//Se declaran todos los accesos de los archivos routes Marco
const Admin = require('./routes/admin.route');
const Descuentos = require('./routes/descuentos.route');

const app = express();
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


// Se crea variable db para ser reutilizada en el "callback".
let db;

//Se conecta la base de datos antes de levantar el servidor, mediante los datos del archivo .env en la raiz del proyecto.
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    //Guarda el objeto db para que el callback la pueda reutilizar.
    db = database;
    console.log("Se estableció la conexión con la base datos.");

    // Se inicia la aplicacion.
    const server = app.listen(process.env.PORT || 8000, function() {
        let port = server.address().port;
        console.log("La aplicación está levantada en el puerto: ", port);
    });
});

//Error general en caso de que falle un "endpoint".
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({ "error": message });
}

// Conexión a todas la rutas Will
app.use('/api', EncargadoRecintos);
app.use('/api', Recintos);
app.use('/api', Organizador);


// Conexión a todas la rutas Francisco
app.use('/api', Evento);
app.use('/api', Avatar);
app.use('/api', Impuesto);
app.use('/api', Plataforma);
app.use('/api', Bitacora);
app.use('/api', Carrito);

//Conexión a todas la rutas Daniel

app.use('/api', TipodeEvento);




//Conexión a todas la rutas Andres
app.use('/api', Cliente);
app.use('/api', User);




//Conexión a todas la rutas Marco
app.use('/api', Descuentos);
app.use('/api', Admin);