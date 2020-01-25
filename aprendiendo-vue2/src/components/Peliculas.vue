<template>
  <div class="general">
    <div class="center">
      <section id="content">
        <h2 class="subheader">Peliculas</h2>
        <div class="favorita" v-if="favorita">
          <!--Si nos llega true mostrar el titulo de la pelicula favorita-->
          La pelicula Marcada es :
          <h2>{{favorita.title}}</h2>
        </div>
        <!--Listado articulos-->
        <div id="articles">
          <!--Recorrer el array de objeto peliculas y pasar las propiedades al componente Pelicula.vue-->
          <!--llamar al metodo peliculaMayuscula que esta en computed para que aga la logica de poner los titulos de los arrays en Mayuscula-->
          <div v-for="pelicula in peliculasMayuscula" v-bind:key="pelicula.title">
            <!--Pasar el v-bind al componente Pelicula.vue-->
            <!--Debe de ponerse con : por que en vue se interpreta asi cuando se trata de pasar objetos a componente hijo-->
            <!--Recibimos el evento favorita del emit y creamos el metodo para recuperar la información de la pelicula que nos llega del componente padre-->
            <Pelicula :pelicula="pelicula" @favorita="haLlegadoLaPeliculaFavorita"></Pelicula>
          </div>
        </div>
      </section>
      <Sidebar></Sidebar>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
import Pelicula from "./Pelicula.vue";
import Sidebar from './Sidebar.vue'
export default {
  name: "Peliculas",
  components: {
    Pelicula,
    Sidebar
  },
  methods: {
    haLlegadoLaPeliculaFavorita(favorita) {
      //Recibimos la informacion de la pelicula que nos llega.
      console.log(favorita);
      alert('Se ha ejecutado el evento en el padre');

      //asignamos la propiedad la informacion que nos llega de la pelicula y hacemos una comprovación en el html
      this.favorita = favorita;
    }
  },
  computed: {
    peliculasMayuscula() {

      //Recorrer todos los arrays que nos llega y poner el titulo en mayusculas
      var peliculasMod = this.peliculas;
      for(var i=0; i<this.peliculas.length;i++) {
        peliculasMod[i].title = peliculasMod[i].title.toUpperCase();
      }
      
      return peliculasMod;
    }
  },
  data() {
    return {
      //Creamos una propiedad favorita vacia para hacer una comprovacion en el metodo
      favorita: null,
      peliculas: [
        {
          title: "Batman vs Superman",
          year: 2017,
          image:
            "https://dam.smashmexico.com.mx/wp-content/uploads/2018/04/24160545/batman_v_superman_dawn_of_justice-cover.jpg"
        },
        {
          title: "Gran torino",
          year: 2015,
          image: "https://pics.filmaffinity.com/Gran_Torino-278262332-large.jpg"
        },
        {
          title: "El señor de los anillos",
          year: 2003,
          image:
            "https://vignette.wikia.nocookie.net/eldragonverde/images/b/b2/Cinemania_lordoftherings.jpg/revision/latest/scale-to-width-down/340?cb=20130103162924&path-prefix=es"
        }
      ]
    };
  }
};
</script>