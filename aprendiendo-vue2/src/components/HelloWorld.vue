<template>
  <div class="hello">
    <section id="content">
      <h2 class="subheader">{{ texto}}</h2>
      <!--Binding por interpolación-->
      <h2>{{texto}}</h2>
     
    </section>  
  </div>
</template>

<script>
//Para importar otros componentes en un componente tambien hay que importarlos
//import MiComponente from "./MiComponente";

export default {
  name: "HelloWorld",
  components: {
    //Cargamos el componente
    //MiComponente
  },
  props: {
    msg: String
  },
  data() {
    return {
      //Propiedades que queremos mostrar por la vista
      texto: "Hola mundo desde el componente!!",
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
