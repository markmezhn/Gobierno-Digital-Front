import Axios from "axios";

export default {
    state: {
        authenticated: false,
        accessToken: null,
        username: null,
        roles: null,
        apiUrl: '',
        isAdmin: null
    },
    getters: {
        api(state, getters, rootState) {
            return Axios.create({
                headers: {
                    "Authorization": `Bearer ${state.accessToken}`,
                    "Accept-Language": "es-MX",
                    "Content-Type": "application/json"
                },
                baseURL: `${rootState.apiUrl}/api/v1`
            });
        },
        getUserName(state){
            return state.username;
        },
        getRolesuser(state){
            return state.roles;
        }
    },
    mutations: {
        setAuthenticated(state, header) {
            localStorage.setItem('access_token', header.token);
            state.accessToken = header.token;

/*             state.username = header.name;
            localStorage.setItem('username', header.name); */

            state.roles = header.roles;
        
            localStorage.setItem('roles', header.roles);

            state.isAdmin = header.isAdmin;

            localStorage.setItem('isAdmin', header.isAdmin);

            state.authenticated = header.authenticated;
        },
        clearAuthentication(state) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('username');
            state.username = null;
            state.authenticated = false;
            state.accessToken = null;
        }
    },
    actions: {
        async authenticate({ commit }, credentials) {
            let formData = {};
            formData.email = credentials.email;
            formData.password = credentials.password;
            let response = await Axios.post(`http://127.0.0.1:8000/api/v1/login`, formData, {
                'Content-Type': 'application/json'
            });
            
            if(response.status == 200) {
                commit("setAuthenticated", response.data.success);
            }
        },
        async logOut(context) {
            await context.commit("clearAuthentication");
        }
    }
}