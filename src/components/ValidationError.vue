<template>
    <div v-if="show" class="trust1-danger">
        <div v-for="m in messages" v-bind:key="m">{{ m }}</div>
    </div>
</template>
<script>
export default {
    props: ["validation", "field", "message", "type"],
    computed: {
        show() {
            return this.validation.$dirty && this.validation.$invalid
        },
        messages() {
            let messages = [];
            if(this.validation.$dirty) {
                if(this.hasValidationError("required")) {
                    if(this.field){
                        messages.push(`Por favor introduzca ${this.field}`)
                    } else {
                        messages.push("Por favor introduzca el dato solicitado"); 
                    }
                } else if (this.hasValidationError("email")) {
                    messages.push("Por favor introduzca un correo electrónico válido");
                } else if(this.hasValidationError("minLength")) {
                    if(this.type == "minLength"){
                        messages.push(this.message);
                    } else {
                        messages.push("Por favor introduzca al menos 8 caracteres");
                    }
                } else if (this.hasValidationError("hasUppercase")) {
                    messages.push("Su contraseña debe contener al menos una mayúscula");
                } else if(this.hasValidationError("hasNumeric")){
                    messages.push("Su contraseña debe contener al menos un número");
                } else if(this.hasValidationError("sameAs")){
                    messages.push("Su contraseña debe coincidir en ambos campos");
                } else if(this.hasValidationError("isValidMonth")){
                    messages.push("Introduzca un mes válido");
                } else if(this.hasValidationError("greaterThanZero")){
                    messages.push("Introduzca un valor mayor a 0");
                } else if(this.hasValidationError("hasOnlyNumbers")){
                    messages.push("Solo puede introducir números enteros")
                }
            }
            return messages;
        }
    },
    methods: {
        hasValidationError(type) {
            return this.validation.$params.hasOwnProperty(type) && !this.validation[type];
        }
    }
}
</script>
<style>
    .trust1-danger {
        color: #CC0000;
        font-size: 14px;
        margin-top: 5px;
    }
</style>