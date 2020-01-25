import Vue from 'vue'
import App from './App.vue'

//Importar modulo de rutas
import VueRouter from 'vue-router';

//importar validaciones
import Vuelidate from 'vuelidate';

//Cargar componentes para las rutas
import LastArticles from './components/LastArticles.vue'
import MiComponente from './components/MiComponente.vue'
import HelloWorld from './components/HelloWorld.vue'
import Blog from './components/Blog.vue'
import Formulario from './components/Formulario.vue'
import Pagina from './components/Pagina.vue'
import ErrorComponent from './components/ErrorComponent.vue'
import Peliculas from './components/Peliculas.vue'



Vue.config.productionTip = false
Vue.prototype.$log = console.log

//Cargar y dar uso al VueRouter
Vue.use(VueRouter)

//Cargar validaciones
Vue.use(Vuelidate);

//Crear routing 
const routes = [
  {path: '/home', component: LastArticles},
  {path: '/blog', component: Blog},
  {path: '/formulario', component: Formulario},
  {path: '/pagina/:id?', name:'pagina', component: Pagina},//Para pasarle un parametro por url pasar /:id y parametro opcional /:id?
  {path: '/peliculas', name:'peliculas', component: Peliculas}, 
  {path: '/hola-mundo', component: HelloWorld},
  {path: '/ultimos-articulos', component: LastArticles},
  {path: '/mi-componente', component: MiComponente},
  {path: '/hola-mundo', component: HelloWorld},
  {path: '/', component: LastArticles},
  {path: '*', component: ErrorComponent}
];

//Instanciar el objeto router para que funcione las rutas
const router = new VueRouter ({
  routes,
  mode: 'history'
});


new Vue({
  router, //Cargar routas en la app
  render: h => h(App),
}).$mount('#app')
