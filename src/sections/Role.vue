<template>
    <!-- <div class="container"> -->
        <div class="row mt-5">
            <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1 mb-4">
                <!--Card-->
                <div class="card mt-5">
                    <!--Card content-->
                    <div class="card-body">
                        <!-- Subscription mform -->
                        <div class="container-fluid">
                            <div class="row">
                                <b class="text-center">Listado de roles</b>
                            </div>
                           <div class="row">
                               <div v-if="isAdmin" class="col text-right">
                                  <button @click="$router.push('/home/create-role')" class="btn btn-primary">Crear</button>
                               </div>
                            </div>
                            <div class="row" style="overflow-x:auto;">
                                <!-- <div class="col"> -->
                                    <!--Table-->
                                    <table class="table">
                                        <!--Table head-->
                                        <thead class="blue-grey lighten-4">
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Slug</th>
                                            <th>Descripción</th>
                                            <th class="text-center">Modificar</th>
                                            <th class="text-center">Eliminar</th>
                                        </tr>
                                        </thead>
                                        <!--Table head-->

                                        <!--Table body-->
                                        <tbody>
                                            <tr v-for="role in roles" :key="role.id">
                                                <td>{{ role.name }}</td>
                                                <td>{{ role.slug }}</td>
                                                <td>{{ role.description }}</td>
                                                <td class="text-center">
                                                    <button v-if="isAdmin" class="btn-table btn-warning" @click="editRole(role.id)"><i class="fa fa-pencil"></i></button>
                                                </td>
                                                <td class="text-center">
                                                    <button v-if="isAdmin" class="btn-table btn-danger" @click="toggleDelete(role.id)"><i class="fa fa-trash"></i></button>
                                                </td>
                                            </tr>
                                        </tbody>
                                        <!--Table body-->
                                    </table>
                                <!-- </div> -->
                            </div>
                        </div>
                        <!-- Subscription form -->
                    </div>
                </div>
                <!--/.Card-->
            </div>
            <!--Grid column-->
            <mdb-modal
                size="danger"
                position="notify"
                :show="showModalDelete"
                @close="toggleDelete"
            >
                <!--Header-->
                <mdb-modal-header class="text-white">
                <p class="heading lead">Eliminar registro</p>
                </mdb-modal-header>
                <!--Body-->
                <mdb-modal-body>
                <div class="row">
                    <div class="col text-center">
                        </div>
                        <div class="col">
                        <p class="text-center">
                            ¿Está seguro de querer borrar el registro seleccionado?
                        </p>
                            <h2 class="text-center"> 
                                <span class="badge">Esta operación no se puede deshacer</span>
                            </h2>
                    </div>
                </div>
                </mdb-modal-body>
                <!--Footer-->
                <mdb-modal-footer class="justify-content-center">
                <mdb-btn color="danger" @click.native="delRole">
                    BORRAR
                    <i class="fas fa-gem text-white ml-1"></i>
                </mdb-btn>
                <mdb-btn outline="danger" @click.native="toggleDelete"
                    >CANCELAR</mdb-btn
                >
                </mdb-modal-footer>
            </mdb-modal>
        </div>
    <!-- </div> -->
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { mdbModal, mdbModalHeader, mdbModalBody, mdbModalFooter, mdbBtn } from "mdbvue";
import Swal from 'sweetalert2';

export default {
    name: "User",
    components: {
        mdbModal,
        mdbModalHeader,
        mdbModalBody,
        mdbModalFooter,
        mdbBtn
    },
    mounted(){
        this.getData();
    },
    data(){
        return {
                showModalDelete: false,
                selected: ""
            }
    },
    computed: {
        ...mapGetters({ roles: "getRoles" }),
        ...mapState({ isAdmin: state => state.auth.isAdmin })
    },
    validations: {
        
    },
    methods: {
        ...mapActions(["getRoles", "deleteRole"]),
        async getData(){
            await this.getRoles();
        },
        editRole(role_id){
            this.$router.push(`/home/edit-role/${role_id}`)
        },
        toggleDelete(role_id){
            if(role_id){
                this.selected = role_id;
            }
            this.showModalDelete = !this.showModalDelete;
        },
        async delRole(){
            try{
                let response = await this.deleteRole({ id: this.selected });
                if(response.data.success){
                    this.getData();
                    this.toggleDelete();
                     Swal.fire(
                            'Rol eliminado!',
                            response.data.success,
                            'success'
                        );
                }
            } catch(e){
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
    }
}
</script>