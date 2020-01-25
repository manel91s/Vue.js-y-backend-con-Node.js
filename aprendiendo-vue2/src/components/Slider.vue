<template>
  <div>
    <div id="slider" :class="{
      //Si la prop llega true agrandamos el slider pasando la clase slider-big, del componente en concreto
      'slider-big':home,
      //Si la prop llega false el slider se vuelve mas pequeño
      'slider-small': !home
      }">


      <!--Usamos el binding para pintar el texto del slider conforme van cambiando a los componentes hijos-->
      <h1>{{texto}}</h1>
      <!--Utilizamos router link para enlazar botones con las diferentes rutas-->
      <router-link to="/blog" class="btn-white" v-if="home">Ir al blog</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: "Slider",
  //Recibimos las props de los elementos padre que es lo que cambia el texto del slider en los diferentes componentes
  props: ['texto','home']
};
</script>