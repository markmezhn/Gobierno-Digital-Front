const userUrl = `/user`;

export default {
    state: {
        username: '',
        email: '',
        name: '',
        users: []
    },
    getters: {
        getEmail: (state) => {
            return state.email;
        },
        getUsername: (state) => {
            return state.username;
        },
        getName: (state) => {
            return state.name;
        },
        getUsers: (state) => {
            return state.users;
        }
    },
    mutations: {
        _setEmail(state, email){
            state.email = email;
        },
        _setUsername: (state, username) => {
            state.username = username;
        },
        _setName: (state, name) => {
            state.name = name;
        },
        _setUsers: (state, users) => {
            state.users = users;
        }
    },
    actions: {
        async getUsers(context){
            let response = await context.rootGetters.api.get(`${userUrl}s`);
            context.commit("_setUsers", response.data.success);
        },
        async getUser(context, user_id){
            let response = await context.rootGetters.api.get(`${userUrl}/${user_id}`);
            return response.data.success;
        },
        async createUser(context, data){
            let response = await context.rootGetters.api.post(`${userUrl}`, data);
            return response;
        },
        async editUser(context, data){
            let response = await context.rootGetters.api.put(`${userUrl}/${data.id}`, data);
            return response;
        },
        async deleteUser(context, data){
            let response = await context.rootGetters.api.delete(`${userUrl}/${data.id}`);
            return response;
        },
        async assignRoleUser(context, data){
            let response = await context.rootGetters.api.post(`${userUrl}/assign-role`, data);
            return response;
        }
    }
}