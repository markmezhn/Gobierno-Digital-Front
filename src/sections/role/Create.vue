<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1 mb-4">
                <div class="card mt-5">
                    <div class="card-body m-5">
                            <div class="col text-center mb-3">
                                <b class="text-center">Llene los datos para crear un nuevo rol de usuario</b>
                            </div>
                            <form>
                                <div class="form-group">
                                    <label for="">Nombre de rol</label>
                                    <input type="text" v-model="name" class="form-control" />
                                    <validation-error :validation="$v.name"></validation-error>
                                </div>
                                <div class="form-group">
                                    <label for="">Slug</label>
                                    <input type="text" v-model="slug" class="form-control" />
                                     <validation-error :validation="$v.slug"></validation-error> 
                                </div>
                                <div class="form-group">
                                    <label for="">Descripción</label>
                                    <input type="text" v-model="description" class="form-control" />
                                     <validation-error :validation="$v.description"></validation-error> 
                                </div>
                                <div class="text-center mt-4">
                                    <mdb-btn color="danger" @click.native.prevent="$router.push('/home/roles')">Cancelar</mdb-btn>
                                    <mdb-btn color="indigo" v-if="!waitingResponse" @click.native.prevent="addRole">Crear</mdb-btn>
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
import { required } from  "vuelidate/lib/validators"; 
import ValidationError from '@/components/ValidationError';
import { mdbBtn } from "mdbvue";
import Swal from 'sweetalert2';

export default {
    name: "CreateRole",
    components: {
        ValidationError,
        mdbBtn
    },
    data(){
        return {
                name: "",
                slug: "",
                description: "",
                waitingResponse: false
            }
    },
    validations: {
        name: {
            required
        },
        slug: {
            required
        },
        description: {
            required
        }
    },
    methods: {
        ...mapActions(["createRole"]),
        async addRole(){
            this.$v.$touch();
            if(!this.$v.$invalid){ 
                try{
                    this.waitingResponse = true;
                    let response = await this.createRole({ name: this.name, slug: this.slug, description: this.description });
                    if(response.data.success){
                        this.waitingResponse = false;
                        this.$router.push("/home/roles");
                        Swal.fire(
                            'Rol de usuario añadido!',
                            'Usted ha dado de alta un nuevo rol',
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