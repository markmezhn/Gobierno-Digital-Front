// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/build/css/mdb.css'
import 'font-awesome/css/font-awesome.css';
import Vuelidate from "vuelidate"
import './registerServiceWorker'
import VueCryptoJS from 'vue-cryptojs';

Vue.use(Vuelidate);

Vue.use(VueGoogleMaps, {
  load: {
    libraries: 'places'
  }
})

Vue.use(VueCryptoJS);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  components: { App }
  }).$mount('#app')
  
  
