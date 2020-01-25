<template>
<article class="article-item" >
        <div class="image-wrap">
        <!--Para sacar las opciones de las iteracciones del array de objetos en los atributos se an de poner de esta manera: -->
          <img
            :src=pelicula.image
            :alt=pelicula.title
            :title=pelicula.title
          />
        </div>

        <h2>{{pelicula.title}}</h2>

        <!--Utilizar condicion para añadir una clase en algun valor del objeto -->

        <span class="date" :class="{
                yeargreen : pelicula.year >= 2015,
                yearred: pelicula.year <2015
                }" >

                     {{pelicula.year}}</span>

        <a href="#">Leer más</a>
        <!--Creamos un evento click en el boton y le pasamos al metodo la informacion de la pelicula-->
        <input type="button" value="Marcar como favorita" @click="pasarFavoritaAlPadre(pelicula)"> 

        <div class="clearfix"></div>
      </article>

</template>

<script>
    export default {
        name: 'Pelicula',
        //Recibir el array de objetos de Peliculas.vue (componente padre)
        props: ['pelicula'],
        methods: {
          pasarFavoritaAlPadre(pelicula) {
            //console.log(pelicula);
            //Cuando se pulse el boton lanzamos un evento de emit (emitimos) que le pasaremos al componente hijo pelicula 
            //Le pasamos un evento ''favorita'' y la informacion pelicula
            this.$emit('favorita',pelicula);
          }
        }
    }
</script>