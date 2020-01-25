<template>
  <div class="general">

    <div class="center">
      <section id="content">
        <h2 class="subheader">Formulario</h2>
        <!--Lanzar el formulario con el evento submit-->
                <!--Le ponemos .prevent para que no envie el formulario (no recarge la pagina) y agamos la prueba de recibir los datos-->
         <form class="mid-form" @submit.prevent="mostrarUsuario()">
                        <div class="form-group">
                            <label for="nombre">Nombre</label>
                            <input type="text" name="nombre" v-model="user.nombre" />
                            <!--$v parametro que se utiliza para comprovar validacion-->
                            
                            <div v-if="submited && !$v.user.nombre.required">
                              Este campo es requerido
                            </div>

                            <div v-if="submited && !$v.user.nombre.minLength">
                              Este campo debe tener mas caracteres
                            </div>

                            <!--*******Si los campos de los inputs al enviar son de 
                        comprobación invalida saltaran los mensajes de validacion *****---->
                        </div>

                        <div class="form-group">
                            <label for="apellidos">Apellidos</label>
                            <!--Si el campo es tocado y no hay nada dentro que aprezca el mensaje-->
                            <input type="text" name="apellidos" v-model="user.apellidos" />
                             <div v-if="submited && !$v.user.apellidos.required">
                              Este campo es requerido
                            </div>

                            <div v-if="submited && !$v.user.apellidos.minLength">
                              Este campo debe tener mas caracteres
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="bio">Biografia</label>
                            <!--Si el campo es tocado y no hay nada dentro que aprezca el mensaje-->
                            <textarea name="bio" v-model="user.bio"></textarea>
                             <div v-if="submited && !$v.user.bio.required">
                              Este campo es requerido
                            </div>

                             <div v-if="submited && !$v.user.bio.minLength">
                              Este campo es requerido
                            </div>

                          <!--*******Si los campos de los inputs al enviar son de 
                        comprobación invalida saltaran los mensajes de validacion *****---->
                            
                        </div>

                        <div class="form-group radibuttons">
                            <input type="radio" name="genero" value="hombre" v-model="user.genero" checked/> Hombre 
                            <input type="radio" name="genero" value="mujer" v-model="user.genero"/> Mujer 
                            <input type="radio" name="genero" value="otro" v-model="user.genero"/> Otro
                        </div>

                        <div class="clearfix"></div>

                        

                        <input type="submit" value="Enviar" class="btn btn-success" />

                   </form>
      </section>
      <Sidebar></Sidebar>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
//importar las validacioens de la libreria
import { required, minLength} from 'vuelidate/lib/validators';
import Sidebar from "./Sidebar.vue";
export default {
  name: "Formulario",
  components: {
    Sidebar
  },

  //Utilizar las validaciones con la propiedad validations
  validations: {
    
    user: {

      nombre: {
      required,
      minLength: minLength(2)
    },

    apellidos: {
      required,
      minLength: minLength(2)
    },
    bio: {
      required,
      minLength: minLength(10)
    }
  }
    
  },
  data(){
    return {
      //Crear una propiedad booleana para comprobar si se a enviado el formulario
      submited: false,
      user: {
        nombre:'',
        apellidos:'',
        bio:'',
        genero:''
      }
    }
  },
  methods: {
    mostrarUsuario() {
      //Cuando se pulsemos enviar en el formulario llamamos a la propiedad user que contiene los datos del formulario
      console.log(this.user);
      this.submited = true;

    //utilizar aisgnar el metodo touch al atributo $v y hacer comprovacion
      this.$v.$touch();
      
      //Si alguna de las comprobaciones es invalida de los input saldra de la funcion y no se enviara
      if(this.$v.$invalid) {
        return false; 
      }

      alert("Validacion pasada");
    }
  }
};
</script>