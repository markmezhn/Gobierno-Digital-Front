const roleUrl = `/roleuser`;

export default {
   state: {
       rolesuser: []
   },
   getters: {
        getRoles: (state) => {
            return state.rolesuser;
        }
   },
   mutations: {
    _setRoles: (state, roles) => {
        state.rolesuser = roles;
    }
   },
   actions: {
        async getRoles(context){
            let response = await context.rootGetters.api.get(`${roleUrl}`, {
                'Content-type': 'application/json'
            });
            context.commit("_setRoles", response.data.success);
        }
   }
}