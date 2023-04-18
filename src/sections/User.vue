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
                                <b class="text-center">Listado de usuarios</b>
                            </div>
                           <div class="row">
                               <div v-if="isAdmin" class="col text-right">
                                  <button @click="$router.push('/home/create-user')" class="btn btn-primary">Crear</button>
                               </div>
                            </div>
                            <div class="row" style="overflow-x:auto;">
                                <!-- <div class="col"> -->
                                    <!--Table-->
                                    <table class="table">
                                        <!--Table head-->
                                        <thead class="blue-grey lighten-4">
                                        <tr>
                                            <th>Nombre de usuario</th>
                                            <th>E-mail</th>
                                            <th>Rol</th>
                                            <th class="text-center">Modificar</th>
                                            <th class="text-center">Asignar Rol</th>
                                            <th class="text-center">Eliminar</th>
                                        </tr>
                                        </thead>
                                        <!--Table head-->

                                        <!--Table body-->
                                        <tbody>
                                            <tr v-for="user in users" :key="user.id">
                                                <td>{{ user.name }}</td>
                                                <td>{{ user.email }}</td>
                                                <td>  
                                                    <p v-if="user.roles.length > 0">
                                                        <b v-for="(item, index) in user.roles" :key="index">
                                                            {{ item.role.name }}
                                                        </b> 
                                                    </p>                           
                                                    <p v-else>
                                                        <b>
                                                            Sin roles asignados
                                                        </b>
                                                    </p>
                                                </td>
                                                <td class="text-center">
                                                    <button v-if="isAdmin" class="btn-table btn-warning" @click="editUser(user.id)"><i class="fa fa-pencil"></i></button>
                                                </td>
                                                <td class="text-center">
                                                    <button v-if="isAdmin" class="btn-table btn-info" @click="toggleAssignRole(user.id)"><i class="fa fa-user"></i></button>
                                                </td>
                                                <td class="text-center">
                                                    <button v-if="isAdmin" class="btn-table btn-danger" @click="toggleDelete(user.id)"><i class="fa fa-trash"></i></button>
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
                <mdb-btn color="danger" @click.native="delUser">
                    BORRAR
                    <i class="fas fa-gem text-white ml-1"></i>
                </mdb-btn>
                <mdb-btn outline="danger" @click.native="toggleDelete"
                    >CANCELAR</mdb-btn
                >
                </mdb-modal-footer>
            </mdb-modal>

                        <!--Grid column-->
            <mdb-modal
                size="info"
                position="notify"
                :show="showModalAssignRole"
                @close="toggleAssignRole"
            >
                <!--Header-->
                <mdb-modal-header class="text-white">
                <p class="heading lead">Asignar rol a usuario</p>
                </mdb-modal-header>
                <!--Body-->
                <mdb-modal-body>
                <div class="row">
                    <div class="col text-center">
                        </div>
                    <div class="col-12">
                        <p class="text-center">
                            Elija un rol para asignar a este usuario
                        </p>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <label for="">Rol</label>
                            <select v-model="role_id" class="form-control">
                                <option value="" disabled selected>Seleccione rol</option>
                                <option :value="role.id" v-for="role in roles" v-bind:key="role.id">
                                    {{ role.name }}
                                </option>
                            </select> 
                        </div>
                    </div>
                </div>
                </mdb-modal-body>
                <!--Footer-->
                <mdb-modal-footer class="justify-content-center">
                <mdb-btn color="info" @click.native="assignRole">
                    ASIGNAR ROL
                    <i class="fas fa-gem text-white ml-1"></i>
                </mdb-btn>
                <mdb-btn outline="info" @click.native="toggleAssignRole"
                    >CANCELAR</mdb-btn
                >
                </mdb-modal-footer>
            </mdb-modal>
        </div>
    <!-- </div> -->
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
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
        this.getRoles();
    },
    data(){
        return {
                showModalDelete: false,
                showModalAssignRole: false,
                selected: "",
                role_id: ""
            }
    },
    computed: {
        ...mapGetters({ users: "getUsers", roles: "getRoles" }),
        ...mapState({ isAdmin: state => state.auth.isAdmin })
    },
    methods: {
        ...mapActions(["getUsers", "deleteUser", "getRoles", "assignRoleUser"]),
        async getData(){
            await this.getUsers();
        },
        async getRoles(){
            await this.getRoles();
        },
        editUser(user_id){
            this.$router.push(`/home/edit-user/${user_id}`)
        },
        toggleDelete(user_id){
            if(user_id){
                this.selected = user_id;
            }
            this.showModalDelete = !this.showModalDelete;
        },
        toggleAssignRole(user_id){
            if(user_id){
                this.selected = user_id;
            }
            this.showModalAssignRole = !this.showModalAssignRole;
            this.role_id = "";
        },
        async delUser(){
            try{
                let response = await this.deleteUser({ id: this.selected });
                if(response.data.success){
                    this.getData();
                    this.toggleDelete();
                     Swal.fire(
                            '¡Usuario eliminado!',
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
        },
        async assignRole(){
            try{
                if(this.role_id != ""){
                    let response = await this.assignRoleUser({ user_id: this.selected, role_id: this.role_id });
                    if(response.data.success){
                        this.getData();
                        this.toggleAssignRole();
                         Swal.fire(
                                '¡Se ha asignado el rol al usuario!',
                                response.data.success,
                                'success'
                            );
                    }
                } else {
                    Swal.fire(
                        'Error!',
                        'Por favor elija un rol para asignar',
                        'error'
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