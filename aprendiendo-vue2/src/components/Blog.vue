<template>
  <div class="general">
    <Slider texto="miSlider"></Slider>
    <div class="center">
      <section id="content">
        <h2 class="subheader">Blog</h2>
        
          <ol>
            <li v-for="project in projects" :key="project._id">
                {{project.name}} - {{project.description}} -- {{project.category}} -- {{project.year}} -- {{project.langs}} -- {{project.image}}
            </li>
          </ol>
        
      </section>
      <Sidebar></Sidebar>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
//importar axios para hacer peticiones HTTP
import axios from 'axios';
import Slider from "./Slider.vue";
import Sidebar from "./Sidebar.vue";
//importamos la variable que contiene la URL global
import Global from "../global";
export default {
  name: "Blog",
  components: {
    Slider,
    Sidebar
  },
  mounted() {
    //Cuando se carge la pagina llamar al metodo de recuperar los datos del backend
    this.getArticles();
    
    
  },
  data() {
    return {
      //Creamos una propiedad url y asignamos el valor de la url de la API que nos llega del importado
      url: Global.url,
      projects: []
    }
  },
  methods: {
    //Crear metodos para recuperar los datos de nuestro backend
    getArticles() {
      axios.get(this.url+"projects")
        .then(res => {
          //console.log(res);
          //status es 200 es que la respuesta a ido bien, entonces metemos en la propiedad projects el array que nos llega
          if(res.status == 200) {
            this.projects = res.data.projects
            console.log(this.projects);
          }
        });
    }

  }
};
</script>