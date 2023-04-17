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
                                    <label for="">Rol</label>
                                    <select v-model="role_id" class="form-control">
                                        <option value="" disabled selected>Seleccione rol</option>
                                        <option :value="role.id" v-for="role in roles" v-bind:key="role.id">
                                            {{ role.name }}
                                        </option>
                                    </select>
                                    <validation-error :validation="$v.role_id"></validation-error> 
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
                                    <mdb-btn color="indigo" v-if="!waitingResponse" @click.native.prevent="addUser">Crear</mdb-btn>
                                </div>
                            </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { required, email, sameAs } from  "vuelidate/lib/validators"; 
import ValidationError from '@/components/ValidationError';
import { mdbBtn } from "mdbvue";
import Swal from 'sweetalert2';

export default {
    name: "CreateUser",
    components: {
        ValidationError,
        mdbBtn
    },
    mounted(){
        this.getRoles();
    },
    data(){
        return {
                email: "",
                role_id: "",
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
        role_id: {
            required
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
    computed: {
        ...mapGetters({ roles: "getRoles" })
    },
    methods: {
        ...mapActions(["createUser", "getRoles"]),
        async addUser(){
            this.$v.$touch();
            if(!this.$v.$invalid){ 
                try{
                    this.waitingResponse = true;
                    let response = await this.createUser({ email: this.email, role_id: this.role_id, name: this.name, password: this.password, cpassword: this.cpassword });
                    if(response.data.success){
                        this.waitingResponse = false;
                        this.$router.push("/home/users");
                        Swal.fire(
                            '¡Usuario añadido!',
                            'Usted ha dado de alta un nuevo usuario',
                            'success'
                        );
                    }
                } catch(e){
                    let emessage = "";
                    this.waitingResponse = false;
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
        }
    }
}
</script>