const roleUrl = `/role`;

export default {
   state: {
       roles: []
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
        }
   }
}