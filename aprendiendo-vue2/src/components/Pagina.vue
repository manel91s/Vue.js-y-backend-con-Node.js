<template>
  <div class="general">
    <Slider texto="Pagina de pruebas"></Slider>
    <div class="center">
      <section id="content">
        <h2 class="subheader">Pagina de pruebas</h2>
        <h3>{{id_desde_url}}</h3>
        <!--Crear evento click-->
        <button @click="actualizarNombre()">Actualizar nombre</button>
        <button @click="redirigirAlBlog()">Redirigir al blog</button>
        <h4>{{nombre}}</h4>
      </section>
      <Sidebar></Sidebar>
      <div class="clearfix"></div>
    </div>
    
  </div>
  
</template>

<script>
import Slider from "./Slider.vue";
import Sidebar from "./Sidebar.vue";
export default {
  name: "Pagina",
  components: {
    Slider,
    Sidebar
  },

  //Metodo que se dispara cuando se crea el componente pero no cuando se a cargado completamente

  created() {
    console.log("Componente Creado");
  },
  //Metodo que se ejecuta nada mas cargar el componente
  mounted() {
    console.log("Componente montado!!");
    this.id_desde_url = this.$route.params.id; //Recoger el id de la url.
  },
  //Metodo que se dispara cuando el componente se actualiza
  updated() {
    console.log("Componente actualizado");
  },
  //Metodo que se dispara cuando el componente se elimina
  destroyed() {},
  //Metrodo donde se declara los atributos del componente y los que se acccede desde la vista
  data() {
    return {
      id_desde_url: null, //Crear atributo vacio para asignar el id que nos viene de la url
      nombre: "Manel Aguilera"
    };
  },
  methods: {
    //Para utilizar metodos predefinidos se a de meter en el objeto methods
    actualizarNombre() {
      this.nombre = "MANEL AGUILERA WEB";
      console.log(this.nombre);
    },
    redirigirAlBlog() {
      this.$router.push("/blog"); //redirigir a otro pagina

      //Redirigir con objeto json con name y params
      //this.$router.push({name: 'pagina', params: {id: 'Redireccion'}});
    }
  }
};
</script>