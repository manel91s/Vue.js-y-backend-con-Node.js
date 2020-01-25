'use strict';
//Crear el servidor web con express!!!

//Cargar modulos de node para crear servidor
var express = require ('express');
var bodyParser = require('body-parser');

//Ejecutar express (http)
var app = express();

//Cargar ficheros rutas
var article_routes = require('./routes/article');

//Middlewares   ***---Los middlewares es algo que se ejecuta antes de que cargar una ruta o url de la aplicación***-- 
app.use(bodyParser.urlencoded({extended:false})); //Cargar el bodyParser
app.use(bodyParser.json()); //Para que bodyparser convierta la informacion que recibe el backend en JSON.

//CORS //para permitir peticiones desde el front end (middleware)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// Añadir prefijos a rutas / Cargar rutas 
app.use('/api',article_routes);


//Ruta o metodo HTTP (GET,PUT,DELETE) de prueba para la API REST
/*app.post('/probando',(req,res) => {
    var hola = req.body.hola 
    //para ver los diferentes codigo de error = https://es.wikipedia.org/wiki/Anexo:C%C3%B3digos_de_estado_HTTP
    return res.status(200).send({ //Con el metodo send hacemos una respuesta (Si a ido bien la peticion que nos responda con una lista en JSON)
        curso: 'Master en frameworks', 
        autor: 'Manel Aguilera Martinez',
        url:'manel@gmail.com',
        hola
    }
       

    ); //En este caso 200 es que a sido un resultado existoso y retornamos la respuesta exitosa. 
});*/

//Exportar modulo (fichero actual)
module.exports = app; //exportar el fichero actual para poder utilizarlo en los otros archivos y importarlo