<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 offset-md-2 text-center mt-5 pt-5">
                <img src="https://michoacan.gob.mx/cdn/img/logos/dependencias/finanzas.svg" class="img-fluid logo-login p-4 pt-4" alt="">
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1 mb-4">
                <!--Card-->
                <div class="card">
                    <!--Card content-->
                    <div class="card-body m-5 text-center">
                        <!-- Subscription mform -->
                        BIENVENIDO <b>{{ name }}</b>
                        <br>
                        <p v-if="roles.length > 0">Su rol es: 
                            <b v-for="(item, index) in roles" :key="index">
                                {{ item.role.name }}
                            </b>
                        </p>  
                        <b v-else>
                            Sin roles asignados
                        </b>
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
import { mapState } from "vuex";
export default {
    name: "HomeScreen",
    components: {
    },
    computed: {
        ...mapState({ name: state => state.auth.username, roles: state => state.auth.roles })
    }
}
</script>