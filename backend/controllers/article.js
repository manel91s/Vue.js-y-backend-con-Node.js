"use strict";
//Esto sera una clase en la cual tendremos los diferentes metodos y rutas relacionadas con nuestra API

//importar el modulo de validar los datos
var validator = require("validator");

//importar filesystem para borrar archivos que no queremos que nos llege de la peticion
var fs = require('fs');

//importar el modulo de path para sacar la ruta del archivo que contienen las imagenes en nuestra APIREST

var path = require('path');
/*importar el modelo que contiene la clase para poder guardar los objetos en la base de datos
y contiene la conexion directa con la base de datos */
var Article = require("../models/article");


//Creamos un objeto JSON y dentro realizaremos los diferentes metodos para las peticiones HTTP o viceversa
var controller = {
  datosCurso: (req, res) => {
    var hola = req.body.hola;
    //para ver los diferentes codigo de error = https://es.wikipedia.org/wiki/Anexo:C%C3%B3digos_de_estado_HTTP
    return res.status(200).send({
      //Con el metodo send hacemos una respuesta (Si a ido bien la peticion que nos responda con una lista en JSON)
      curso: "Master en frameworks",
      autor: "Manel Aguilera Martinez",
      url: "manel@gmail.com",
      hola
    });
  },
  test: (req, res) => {
    return res.status(200).send({
      message: "Soy la accion test de mi controlador"
    });
  },
  //Metodo para guardar articulo
  save: (req, res) => {
    //recoger los parametros por post
    var params = req.body; //Recogemos todos los parametros que nos llega en la variable params
    console.log(params);
    //validar datos con la libreria (validator)
    /*utilizar try catch por si la validacion no se cumple bien 
          se lanze la excepcion y nos diga que no se a realizado la validacion*/
    try {
      //Dara true si el lo que hay dentro del validador no esta vacio
      var validate_title = !validator.isEmpty(params.title);
      var validate_content = !validator.isEmpty(params.content);
      /***** Mas validaciones del paquete en https://www.npmjs.com/package/validator*****/
    } catch (err) {
      return res.status(200).send({
        //En caso de que no se cumpla bien la validación retornamos un mensaje
        status: "error", //Creamos una propiedad status para saber si nos devuelve error o success
        message: "Faltan datos por enviar!!!"
      });
    }

    //comprobar si las validaciones son correctas
    if (validate_title && validate_content) {
      //crear el objeto a guardar
      var article = new Article(); //instanciar la clase del modelo

      //asignar valores al objeto: asignamos los valores que nos llegan de la petición que la recogemos con la variable params mas arriba
      article.title = params.title;
      article.content = params.content;
      article.image = null;

      /*Guardar el articulo: El metodo save tiene una funcion de callback, mostrara ''err'' si retornara que no se a guardado,
        en caso de que se guarde y vaya todo bien efectuara articleStored y devolver el objeto con los valores.*/

      article.save((err, articleStored) => {
        //Comprobar si devuelve error o articleStored no devuelve nada
        if (err || !articleStored) {
          return res.status(404).send({
            //Ponemos un codigo de error 404 para que nos devuelva el status error con su correspondiente codigo
            status: "error",
            message: "El articulo no se ha guardado!!!"
          });
        }
        //devolver una respuesta
        return res.status(200).send({
          status: "success", //ponemos un status success la respuesta para que nos indique que ha ido bien
          article: articleStored /*poner la propiedad article y como valor el parametro de la funcion articleStored 
                para que nos devuelva el objeto article con sus valores que es lo que se a guardado en la base de datos */
        });
      });

      //En caso de que la validacion no sea correcta retornar un mensaje :
    } else {
      return res.status(200).send({
        //En caso de que no se cumpla bien la validación retornamos un mensaje
        status: "error", //Creamos una propiedad status para saber si nos devuelve error o success
        message: "Los datos no son validos!!!"
      });
    }
  },
  //Metodo para vevolver todos los articulos o ultimos 5 articulos
  getArticles: (req, res) => {
    //recogemos en la variable query el metodo de hacer consulta para reutilizarlo en la condición
    var query = Article.find({});

    //recogemos en una variable last lo que nos llega por parametro en la url
    var last = req.params.last;
    console.log(last);

    //Si last da true y nos llega algun parametro por la url hacer consulta de 5 ultimos articulos
    if (last || last != undefined) {
      query.limit(5);
    } //Si no sacar todos los articulos

    //Hacer un find para sacar todos los datos de la base de datos
    //sort('-_id') = ordenar la consulta de manera descendente
    query.sort("-_id").exec((err, articles) => {
      //En caso de error en la peticion, lanzamos respues de error

      if (err) {
        return res.status(500).send({
          //Ponemos un error especificio dependiendo del error
          //En caso de que no se cumpla bien la validación retornamos un mensaje
          status: "error", //Creamos una propiedad status para saber si nos devuelve error o success
          message: "error al devolver los datos!!!"
        });
      }

      //En caso de que no haiga articulos en la peticion, lanzamos respueta de error

      if (!articles) {
        return res.status(404).send({
          //Ponemos un error especificio dependiendo del error
          //En caso de que no se cumpla bien la validación retornamos un mensaje
          status: "error", //Creamos una propiedad status para saber si nos devuelve error o success
          message: "No hay articulos! para mostrar!!!!!"
        });
      }

      return res.status(200).send({
        //En caso de que no se cumpla bien la validación retornamos un mensaje
        status: "success", //Creamos una propiedad status para saber si nos devuelve error o success
        articles
      });
    });
  },

  //Metodo para devolver un articulo
  getArticle: (req, res) => {
    //Recoger el id de la url
    var articleId = req.params.id;

    // Comprobar que existe

    if (!articleId || articleId == null) {
      return res.status(404).send({
        //Ponemos un error especificio dependiendo del error
        //En caso de que no se cumpla bien la validación retornamos un mensaje
        status: "error", //Creamos una propiedad status para saber si nos devuelve error o success
        message: "No existe el articulo!!!!"
      });
    }

    //Buscar el articulo
    Article.findById(articleId, (err, article) => {
      if (err) {
        return res.status(500).send({
          //Ponemos un error especificio dependiendo del error
          //En caso de que no se cumpla bien la validación retornamos un mensaje
          status: "error", //Creamos una propiedad status para saber si nos devuelve error o success
          message: "Error al devolver los datos!!!!"
        });
      }

      //Si el articulo no existe: 

      if (!article) {
        return res.status(404).send({
          //Ponemos un error especificio dependiendo del error
          //En caso de que no se cumpla bien la validación retornamos un mensaje
          status: "error", //Creamos una propiedad status para saber si nos devuelve error o success
          message: "No existe el articulo!!!!"
        });
      }

      //En caso de que todo vaya bien : Devolverlo en JSON el articulo

      return res.status(404).send({
        //Ponemos un error especificio dependiendo del error
        //En caso de que no se cumpla bien la validación retornamos un mensaje
        status: "success", //Creamos una propiedad status para saber si nos devuelve error o success
        article
      });
    });
  },
  //Actualizar articulo
  update : (req,res) => {
    //Recoger el id de articulo por la url
    var articleId = req.params.id;
    //Recoger los datos que llegan por put
    var params = req.body;
    
    //Validar datos

    try {
        //Si los datos que nos llegan no estan vacios
        var validate_title = !validator.isEmpty(params.title);
        var validate_content = !validator.isEmpty(params.content);

    }catch(err) {
        return res.status(200).send({
            //Ponemos un error especificio dependiendo del error
            //En caso de que no se cumpla bien la validación retornamos un mensaje
            status: "error", //Creamos una propiedad status para saber si nos devuelve error o success
            message: "Faltan datos por enviar!!!!"
          });
        
    }
    //Si los datos que nos llegan son true 
    if(validate_title && validate_content) {
        //hacer la consulta Find an update
        //_id:articleId buscara por id el articulo id que le pasamos por la url, pasar los ''params'' son los datos que le pasaremos que se actualizaran
        //new:true nos devolvera el objeto que estamos actualizando pero ya actualizado.
        Article.findOneAndUpdate({_id:articleId},params, {new:true}, (err,articleUpdated) => {

            //En caso de que haiga un error devolvemos de respuesta error
            if(err) {
                return res.status(500).send({
                    //Ponemos un error especificio dependiendo del error
                    //En caso de que no se cumpla bien la validación retornamos un mensaje
                    status: "error", //Creamos una propiedad status para saber si nos devuelve error o success
                    message: "error al actualizar!!!!"
                  });

            }

            //En caso de que el articulo no exista devolvemos el error

            if(!articleUpdated) {
                return res.status(404).send({
                    //Ponemos un error especificio dependiendo del error
                    //En caso de que no se cumpla bien la validación retornamos un mensaje
                    status: "error", //Creamos una propiedad status para saber si nos devuelve error o success
                    message: "No existe el articulo!!!!"
                  });

            }

            //Y en caso de que se cumpla devolvemos el objeto actualizado en Formato JSON

            return res.status(200).send({
                //Ponemos un error especificio dependiendo del error
                //En caso de que no se cumpla bien la validación retornamos un mensaje
                status: "success", //Creamos una propiedad status para saber si nos devuelve error o success
                article: articleUpdated
              });
        }); 

    }else {
        //En caso de que no sea correcta
        return res.status(200).send({
            //Ponemos un error especificio dependiendo del error
            //En caso de que no se cumpla bien la validación retornamos un mensaje
            status: "error", //Creamos una propiedad status para saber si nos devuelve error o success
            message: "La validacion no es correcta!!!!"
          });

    }


    },
    //metodo para borrar articulo
    delete: (req,res) => {

        //Recoger el id de la url
        var articleId = req.params.id;

        //find and delete
        //_id:articleId comprovar que el id es igual al id que nos llega por la petición sea correcta y pueda borrarlo
        Article.findOneAndDelete({_id:articleId}, (err, articleRemoved) => {
            //En caso de que llege un error:
            if(err) {

                return res.status(500).send({
                    //Ponemos un error especificio dependiendo del error
                    //En caso de que no se cumpla bien la validación retornamos un mensaje
                    status: "error", //Creamos una propiedad status para saber si nos devuelve error o success
                    message: "Error al borrar!!!!"
                  });


            }

            //En caso de que el articulo no llega de la peticion:
            if(!articleRemoved) {

                return res.status(404).send({
                    //Ponemos un error especificio dependiendo del error
                    //En caso de que no se cumpla bien la validación retornamos un mensaje
                    status: "error", //Creamos una propiedad status para saber si nos devuelve error o success
                    message: "No se ha borrado el articulo, posiblemente no exista!!!!"
                  });
        

            }

            //En caso de que el articulo si exista :

            return res.status(200).send({
                //Ponemos un error especificio dependiendo del error
                status: "success", //Creamos una propiedad status para saber si nos devuelve error o success
                article: articleRemoved //Creamos la propiedad article y retornamos el articulo borrado 
              });

        });

    },
    //metodo para subir archivos
    upload: (req,res) => {

        //Configurar el modulo connect multiparty router/article.js (hecho en routes/article.js)
        
        //Recoger el fichero de la petición 
        var file_name = 'Imagen no subida...';

        //En caso de que no llege ningun archivo por la peticion:
        if(!req.files) {
            return res.status(404).send({
                status: "Error",
                message:file_name
            });
        }

        //Conseguir el nombre y la extensión del archivo
        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');
        // * ADVERTENCIA * EN LINUX O MAC
        //var file_split = file_path.split('/');

        //Nombre del archivo : Recoger el ultimo indice que es el que contiene el nombre de la imagen
        var file_name = file_split[2];
        //Extensión del fichero
        var extension_split = file_name.split('\.');
        //Conseguir la extensión sin el .
        var file_ext = extension_split[1];

        //Comprobar la extensión, solo imagenes, si no es valida borra el fichero
        
        if(file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif') {
            //borrar el archivo subido que se aloja en nuestro sistema de archivos 
            fs.unlink(file_path, (err) => {

                return res.status(200).send({
                    status: "error",
                    message: 'La extensión de la imagen no es valida'
                  });

            });

        }else{

        //Si todo es valido, sacando la id de la url de la peticion

        var articleId = req.params.id;
        
        //Buscar el articulo, asignarle el nombre de la imagen y actualizarlo
        //creamos un objeto json image por que solo sera el unico objeto que queremos cambiar y le pasamos el file name
        //new:true para que nos devuelva el objeto actualizado en la respuesta
         //_id:articleId comprovar que el id es igual al id que nos llega por la petición sea correcta y pueda subir la imagen en dicho articulo
        
        Article.findOneAndUpdate({_id:articleId}, {image:file_name}, {new:true}, (err,articleUpdated) => {
            
            //En caso de error o no exista esa id del articulo :
            if(err || !articleUpdated) {
                return res.status(200).send({
                    status: 'error',
                    message:'Error al guardar la imagen de articulos'
                  });

            }

            return res.status(200).send({
                status: 'success',
                article: articleUpdated
              });
            
        });

     }
     



    },//end upload file
    //metodo para poder sacar (devolver) la imagen del backend al front end
    getImage: (req,res) => {
        //sacar el fichero que nos llega por la peticion
        var file = req.params.image;

        //Crear una variable con el path donde se alojan las imagenes y concatenar el nombre de la imagen que nos llega
        var path_file = './upload/articles/'+file;

        //Comprobar si el fichero existe
        fs.exists(path_file, (exists) => {

            if(exists) {
                //utilizar libreria del path y el resolve resolvera la ruta y resolvera en devolver la imagen en pixeles 
                return res.sendFile(path.resolve(path_file));

            }else{
                return res.status(404).send({
                    status: 'error',
                    message: 'La imagen no existe!!'
                  });

            }
        });


    },
    //metodo para buscar 
    search: (req, res) => {
        //Sacar el string a buscar
        var searchString = req.params.search;

        //Find or
        /*Si el searchString esta contenido esta incluido dentro del titulo o el searchString esta incluido dentro del content entonces
        sacara los articulos que coincidan con eso*/
        
        Article.find({ "$or": [
            {"title": {"$regex": searchString, "$options": "i"}}, //"i" si search string esta incluido en el parameto titulo
            {"content": {"$regex": searchString, "$options": "i"}}

        ]})
        .sort([['date','descending']]) //ordenar por fecha descendiente
        //Ejecutar la consulta y hacer la respuesta
        .exec((err, articles) => {

            //Si llega un error 

            if(err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error en la petición'
                  });
            }

            //Si los articulos no existen o los datos vienen vacios:
            if(!articles || articles.length<=0) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos para mostrar que coincidan con tu busqueda'
                  });
            }

            //Si ha ido bien que lanze la respuesta con los articulos de la busqueda:

            return res.status(200).send({
                status: 'success',
                articles
              });
    

        });

        
      
    }
    
    

  
}; //end controller

//exportar el modulo controller para importarlo en el archivo de rutas y devolver todos los metodos
module.exports = controller;
