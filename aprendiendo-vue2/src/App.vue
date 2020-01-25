<template>
  <div id="app">
    <HeaderComponent></HeaderComponent>
   
    <!--LastArticles></!--LastArticles>-->
    <!--Utilizar el routerView para que las routas se correspondan con las url-->
    <router-view></router-view>
    
    <FooterComponent></FooterComponent>
    
  </div>
</template>

<script>
//App vue es el archivo donde se cargan todos los componentes de la app
//import HelloWorld from './components/HelloWorld.vue'
//import MiComponente from './components/MiComponente.vue'
import HeaderComponent from './components/HeaderComponent.vue'

//import LastArticles from './components/LastArticles.vue'
import FooterComponent from './components/FooterComponent.vue'

export default {
  name: 'app',
  components: {//Cargar los componentes importados
    //HelloWorld,
    //MiComponente,
    HeaderComponent,
    //LastArticles,
    FooterComponent
  }
}
</script>

<style>
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/

/*Importar css externos */
@import './assets/css/styles.css';

</style>
