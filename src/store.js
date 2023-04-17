import Vue from 'vue'
import Vuex from 'vuex'
import AuthModule from './store/auth';
import UserModule from './store/user';
import RoleModule from './store/role';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { auth: AuthModule, user: UserModule, role: RoleModule },
  state: {
    sidenav: true,
    apiUrl: ''
  },
  getters: {
    sidenav: state => state.sidenav
  },
  mutations: {
    toggleSideNav: (state, value) => {
      if (typeof value === 'boolean') {
        state.sidenav = value;
        return;
      }
      state.sidenav = !state.sidenav;
    },
    setApiurl(state, header){
        if(header == "prod"){
            state.apiUrl = "https://api.brainsbug.com";
        } else if(header == "dev") {
            state.apiUrl = "http://localhost:8000";
        }
    }
  },
  actions: {
    toggleSideNav({commit}, value) {
      commit('toggleSideNav', value)
    },
    setDeployMode(context, mode){
      context.commit("setApiurl", mode);
    }
  }
})
