<template>
  <!--En vue para que funcione el binding el contenido tiene que estar en una etiqueta div-->

  <section id="content">
    <h2 class="subheader">Mi Componente</h2>
    <h1>Este es MI COMPONENTE</h1>
    <h2>{{subtitulo}}</h2>

    <h2>Reactividad</h2>
    <!-- v-model directiva para utilizar two-way data binding-->
    <input type="text" v-model="nombre">
    Mi nombre es : <strong>{{nombre}}</strong>

    <h2>Directivas condicionales</h2>
    <input type="number" v-model="edad">
    Mi edad es: <strong>{{edad}}</strong>

      <!--Sentencia if en vue-->
    <p style="color:red;front-weight:bold;" v-if="edad && edad >=18">Eres mayor edad </p>

    <!--Sentencia for en vue-->
    <h2>Directiva iterativa </h2>
    <ol>
    <!--añadir key nombre para que vue no nos de error -->
      <li v-for="pelicula in peliculas" :key="pelicula"> {{pelicula}}</li>
    </ol>
        
  </section>
</template>

<script>
export default {
  name: "MiComponente", //Nombre del componente
  data() {
    return {
      subtitulo: "Soy el Subtitulo de mi componente",
      nombre: '',
      edad: 18,
      peliculas:['Batman vs Superman', 'El señor de los anillos','Spiderman','Anabel']
    };
  }
};
</script>