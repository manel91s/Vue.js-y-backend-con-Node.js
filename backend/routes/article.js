'use strict';
//Crear archivo de rutas

//importar modulo de express para las rutas
var express = require('express');
//Cargar el controlador que emos creado
var ArticleController = require('../controllers/article');

//llamar el metodo router que trae express
var router = express.Router();

//importar el modulo de connect-multiparty para subir archivos
var multipart = require('connect-multiparty');

//crear el midelware para que se ejecute la funcionalidad antes de que se ejecute el metodo de nuestro controlador de subir archivos.
var md_upload = multipart({uploadDir: './upload/articles'}); //Guardar las imagenes que vienen de la petición a dicha carpeta

/*Crear los diferentes nombres de rutas y llamamos a los metodos del controlador importado ''ArticleController''
que contiene la logica de las peticiones que recibe la api*/

router.post('/datos-curso', ArticleController.datosCurso); 
router.get('/test-de-controlador', ArticleController.test);
router.post('/save',ArticleController.save);
//:last? : creamos un parametro opcional con ?, en el que opcionalmente podemos pasar parametros a esa ruta para hacer consultas de algun id especifico
router.get('/articles/:last?',ArticleController.getArticles);
//Pasamos un parametro pero esta vez sera obligatorio pasarle un parametro ya que necesitaremos un id para recuperar ese articulo en especifico
router.get('/article/:id',ArticleController.getArticle);
router.put('/article/:id',ArticleController.update);
router.delete('/article/:id',ArticleController.delete);
//aplicar el middleware de los ficheros a la ruta: para que acepte los archivos que le llegan 
router.post('/upload-image/:id',md_upload, ArticleController.upload);
//Le pasamos como parametro el nombre de la imagen
router.get('/get-image/:image', ArticleController.getImage);
router.get('/search/:search', ArticleController.search);

//eportar el modulo actual de las rutas para importarlo y cargarlo en app.js
module.exports = router;
