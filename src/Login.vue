<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4 offset-md-4 text-center mt-5 pt-5">
                <img src="https://michoacan.gob.mx/cdn/img/logos/dependencias/finanzas.svg" class="img-fluid logo-login p-4 pt-4" alt="">
            </div>
        </div>
        <div class="row pt-2">
            <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1 mb-4">
                <div class="card">
                    <div class="card-body m-5">
                        <form>
                            <p class="h5 text-center mb-4" style="text-transform: uppercase;">Prueba técnica para vacante de desarrollador fullstack</p>
                            <p class="text-grey">Inicie sesión para crear usuarios, dar de alta usuarios.</p>
                            
                            <div class="form-group">
                                <label for="">Correo electrónico</label>
                                <input type="email" @keyup.enter="handleAuth" v-model="email" class="form-control" />
                                <validation-error :validation="$v.email"></validation-error>
                            </div>

                            <div class="form-group">
                                <label for="">Password</label>
                                <input type="password" @keyup.enter="handleAuth" v-model="password" class="form-control" />
                                <validation-error :validation="$v.password"></validation-error>
                            </div>
                            
                            <div class="text-center mt-4">
                             <mdb-btn @click.native.prevent="handleAuth" color="indigo"
                                >Iniciar Sesión</mdb-btn> 
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ValidationError from '@/components/ValidationError';
import Swal from 'sweetalert2';
import { mapActions, mapState } from "vuex";
import { required, email } from "vuelidate/lib/validators";
  

import {
  mdbBtn    
} from "mdbvue";

export default {
    name: "Login",
    components: {
        mdbBtn,
        ValidationError
    },
    data(){
        return {
            email: '',
            password: '',
            loggin: true
        }
    },
    validations: {
        email: {
            required,
            email
        },
        password: {
            required
        }
    },
    computed: {
        ...mapState({ authenticated: state => state.auth.authenticated, token: state => state.auth.accessToken }),
    },
    methods: {
        ...mapActions(['authenticate']),
         async handleAuth(){
            this.$v.$touch();
            if(!this.$v.$invalid){ 
                try{
                    this.loggin = false;
                    await this.authenticate({ email: this.email,  password: this.password });
          
                    if(this.authenticated){
                        this.$router.push("/home");
                        Swal.fire(
                            'Bienvenido!',
                            'Usted ha iniciado sesión en su cuenta',
                            'success'
                        );
                    }
                } catch(e){
                    this.loggin = true;
                    let emessage = "";
                    if(e.response){
                        emessage = e.response.data.error;
                    }
                        Swal.fire(
                            'Error!',
                            emessage,
                            'error'
                        );
                }
            }
        },  
    }
}
</script>
<style>
    body {
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        background-attachment: fixed;
    }    

    .logo-login {
        background-color: rgba(255,255,255,.78);
        border-radius: 10px;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);

        @media(max-width: 600px){
            border-radius: 0px;
        }
    }
</style>