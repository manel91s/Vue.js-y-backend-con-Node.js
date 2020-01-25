<template>
  <header id="header">
    <div class="center">
      <!-- LOGO -->
      <div id="logo">
        <img src="../assets/logo.png" class="app-logo" alt="Logotipo" />
        <span id="brand">
          <strong>Curso</strong>Vue
        </span>
      </div>

      <!-- MENU -->
      <nav id="menu">
        <ul>
          <!---router-link para enroutar los enlaces de manera SPA viene en el packete de VueRouter--->
          <li>
            <!--active-class para visualizar en que posicion del menu se encuentra, Ojo: añadir la clase active y darle estilos-->
            <router-link to="/home" active-class="active">Inicio</router-link>
          </li>
          <li>
            <router-link to="/blog" active-class="active">Blog</router-link>
          </li>
          <li>
            <router-link to="/formulario" active-class="active">Formulario</router-link>
          </li>
          <li>
              <!---Para pasarle un objeto como parametro a la url se puede hacer con :to-->
            <router-link :to="{name:'pagina', params: {id: 'Soy el valor del paramatro'}}" active-class="active">Pagina 1</router-link>
          </li>
          <li>
            <router-link to="/peliculas" active-class="active">Peliculas</router-link>
          </li>
        </ul>
      </nav>

      <!--LIMPIAR FLOTADOS-->
      <div class="clearfix"></div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent"
};
</script>