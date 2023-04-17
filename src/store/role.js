const roleUrl = `/role`;

export default {
   state: {
       roles: [],
       name: null,
       slug: null,
       description: null
   },
   getters: {
        getRoles: (state) => {
            return state.roles;
        }
   },
   mutations: {
    _setRoles: (state, roles) => {
        state.roles = roles;
    }
   },
   actions: {
        async getRoles(context){
            let response = await context.rootGetters.api.get(`${roleUrl}s`, {
                'Content-type': 'application/json'
            });
            context.commit("_setRoles", response.data.success);
        },
        async getRole(context, role_id){
            let response = await context.rootGetters.api.get(`${roleUrl}/${role_id}`);
            return response.data;
        },
        async createRole(context, data){
            let response = await context.rootGetters.api.post(`${roleUrl}`, data);
            return response;
        },
        async editRole(context, data){
            let response = await context.rootGetters.api.put(`${roleUrl}/${data.id}`, data);
            return response;
        },
        async deleteRole(context, data){
            let response = await context.rootGetters.api.delete(`${roleUrl}/${data.id}`);
            return response;
        }
   }
}