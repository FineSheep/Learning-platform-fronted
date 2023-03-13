export default {
    namespaced: true,
    actions: {},
    mutations: {
        storeUser(state, value) {
            state.user = value
        }

    },
    state: {
        user: {}
    },
    getters: {
        getUser(state) {
            return state.user;
        }
    }
}