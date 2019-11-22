'use strict';

const LocalStrategy = require('passport-local').Strategy;

//consultar modelo de usuarios
const Cliente = require('./api/models/clientes.model');

module.exports = function(passport) {

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        Cliente.findById(id, (err, user) => {
            done(err, user);
        });
    });

    //signup
    passport.use('local-signup', new LocalStrategy({
            correo: 'correo',
            contrasena: 'contrasena',
            passReqToCallback: true
        },
        function(req, correo, contrasena, done) {
            Cliente.findOne({ correo_cliente: req.body.correo_cliente }, function(err, cliente) {
                if (err) { return done(err); }
                if (cliente)
            })
        }));

}