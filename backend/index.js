'use strict'

//importar mongoose 
var mongoose = require('mongoose');
//Cargar modulo app
var app = require('./app');

//asignar el puerto que queremos utilizar para esta aplicación
var port = 3900;

//forzar para que los metodos antiguos de mongoose se desactiven
mongoose.set('useFindAndModify',false);
//Usar promesas para evitar ciertos fallos (interno de mongoose)
mongoose.Promise = global.Promise;
//conexion a la base de datos mongodb - primer parametro url: y nombre base de datos,
// segundo parametro: Permite la nueva sintaxis que incluye mongoose que incluye los nuevos metodos
mongoose.connect('mongodb://localhost:27017/api_rest_blog', {useNewUrlParser:true})
        //Como es una promesa con el metodo then lanzamos un mensaje con el response realizado correctamente
        .then(() => {
            console.log('La conexion a la base de datos se ha realizado bien');

            //Crear servidor y ponerme a escuchar peticiones HTTP
            app.listen(port, () => {
                console.log("Servidor corriendo en http://localhost:"+port);
            });

        });
       