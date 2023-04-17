<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 offset-md-2 text-center mt-5 pt-5">
                <img src="/img/logo-white.svg" class="img-fluid logo-login p-4 pt-4" alt="">
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1 mb-4">
                <!--Card-->
                <div class="card">
                    <!--Card content-->
                    <div class="card-body m-5">
                        <!-- Subscription mform -->
                        <form>
                            <p class="h5 text-center mb-4" style="text-transform: uppercase;">E-shop admin</p>
                            <p class="text-grey">Por favor introduzca y confirme su nueva contraseña.</p>

                            <div class="form-group">
                                <label for="">Nuevo password</label>
                                <input type="password" v-model="password" class="form-control" />
                                <validation-error :validation="$v.password"></validation-error>
                            </div>

                            <div class="form-group">
                                <label for="">Confirme password</label>
                                <input type="password" v-model="cpassword" class="form-control" />
                                <validation-error :validation="$v.cpassword"></validation-error>
                            </div>

                            <div class="text-center mt-4">
                             <mdb-btn @click.native.prevent="changePassword" v-if="!sending" color="indigo"
                                >Cambiar password</mdb-btn> 
                                <p class="text-grey animated fadeIn infinite" v-if="sending">Enviando...</p>
                            </div>
                        </form>
                        <!-- Subscription form -->
                    </div>
                </div>
                <!--/.Card-->
            </div>
            <!--Grid column-->
        </div>
    </div>
</template>
<script>
import ValidationError from '@/components/ValidationError';
import Swal from 'sweetalert2';
import { mapActions } from "vuex";
import { required, sameAs } from "vuelidate/lib/validators";
  

import {
  mdbBtn    
} from "mdbvue";

export default {
    name: "ChangePwd",
    components: {
        mdbBtn,
        ValidationError
    },
    data(){
        return {
            password: '',
            cpassword: '',
            sending: false
        }
    },
    validations: {
        password: {
            required
        },
        cpassword: {
            sameAs: sameAs('password')
        }
    },
    methods: {
        ...mapActions(['changePwd']),
         async changePassword(){
            this.$v.$touch();
            if(!this.$v.$invalid){ 
                try{
                    this.sending = true;
                    let response = await this.changePwd({ password: this.password, cpassword: this.cpassword, id: this.$route.params.id });
                    if(response.data.success){
                        this.sending = false;
                        this.$router.push("/login");
                        Swal.fire(
                            'Su password se ha cambiado!',
                            'Inicie sesión con su nuevo password.',
                            'success'
                        );
                    }
                } catch(e){
                    this.sending = false;
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