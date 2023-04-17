import Axios from "axios";

export default {
    state: {
        authenticated: false,
        accessToken: null,
        username: null,
        role: null,
        apiUrl: ''
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
        }
    },
    mutations: {
        setAuthenticated(state, header) {
            localStorage.setItem('access_token', header.token);
            state.accessToken = header.token;

            state.username = header.name;
            localStorage.setItem('username', header.name);

            state.role = header.role;
            localStorage.setItem('role', header.role);

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
            let response = await Axios.post(`http://localhost:8000/login`, formData, {
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