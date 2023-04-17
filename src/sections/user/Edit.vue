<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1 mb-4">
                <div class="card mt-5">
                    <div class="card-body m-5">
                            <div class="col text-center mb-3">
                                <b class="text-center">Llene los datos para crear un nuevo usuario</b>
                            </div>
                            <form>
                                <div class="form-group">
                                    <label for="">Nombre completo</label>
                                    <input type="text" v-model="name" class="form-control" />
                                    <validation-error :validation="$v.name"></validation-error>
                                </div>
                                <div class="form-group">
                                    <label for="">E-mail</label>
                                    <input type="text" v-model="email" class="form-control" />
                                     <validation-error :validation="$v.email"></validation-error> 
                                </div>
                                <div class="form-group">
                                    <label for="">Password</label>
                                    <input type="password" v-model="password" class="form-control" />
                                    <validation-error :validation="$v.password"></validation-error>
                                </div>
                                <div class="form-group">
                                    <label for="">Confirme password</label>
                                    <input type="password" v-model="cpassword" class="form-control" />
                                    <validation-error :validation="$v.cpassword"></validation-error>
                                </div>
                                <div class="text-center mt-4">
                                    <mdb-btn color="danger" @click.native.prevent="$router.push('/home/users')">Cancelar</mdb-btn>
                                    <mdb-btn color="indigo" @click.native.prevent="saveUser">Guardar</mdb-btn>
                                </div>
                            </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
import { required, email, sameAs } from  "vuelidate/lib/validators"; 
import ValidationError from '@/components/ValidationError';
import { mdbBtn } from "mdbvue";
import Swal from 'sweetalert2';

export default {
    name: "EditUser",
    components: {
        ValidationError,
        mdbBtn
    },
    mounted(){
        this.initUser();
    },
    data(){
        return {
                id: "",
                email: "",
                name: "",
                password: "",
                cpassword: "",
                waitingResponse: false
            }
    },
    validations: {
        email: {
            required,
            email
        },
        name: {
            required
        },
        password: {
            required
        },
        cpassword: {
            sameAs: sameAs('password')
        }
    },
    methods: {
        ...mapActions(["editUser", "getUser"]),
        async saveUser(){
            this.$v.$touch();
            if(!this.$v.$invalid){ 
                try{
                    this.waitingResponse = true;
                    let response = await this.editUser({ id: this.id, email: this.email, name: this.name, password: this.password, cpassword: this.cpassword });
                    if(response.data.success){
                        this.waitingResponse = false;
                        this.$router.push("/home/users");
                        Swal.fire(
                            '¡Usuario modificado!',
                            'Usted ha modificado un usuario',
                            'success'
                        );
                    }
                } catch(e){
                    let emessage = "";
                    this.waitingResponse = true;
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
        async initUser(){
            let user = await this.getUser(this.$route.params.id);
            this.id = user.id;
            this.email = user.email;
            this.name = user.name;
        }
    }
}
</script>