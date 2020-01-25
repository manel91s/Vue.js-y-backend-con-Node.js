'use strict'
//Este archivo es el modelo que vamos a crear en la aplicación 
//Es la capa de abstraccion intermedia con la base de datos con la que interauamos con ella

//importar mongoose
var mongoose = require('mongoose');
//Guardamos en una variable Schema para trabajar con el objeto 
var Schema = mongoose.Schema;

//Definimos el molde del schema que contiene los campos de la base de datos
var ArticleSchema = Schema({
    title: String,
    content: String,
    date: {type: Date, default: Date.now},
    image: String

});

/*exportar el modulo para poder importarlos en otros archivos del backend y asi poder crear objetos nuevos 
o utilizar el modelo para conectar a el y utilizr los metodos find, save , updates.. para la base de datos, etc*/
//''article'' es el nombre que tendra el modelo
// 'En el parametro ArticleSchema' es el Schema (molde) que se va usar para el modelo article
module.exports = mongoose.model('Article', ArticleSchema)
/*Moongose pluraliza 'Article' y lo 
convierte a articles --> guardar documentos de este tipo y 
con estructura dentro de la coleccion en la base de datos*/

