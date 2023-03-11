export default {
    namespaced: true,
    actions: {},
    mutations: {
        storeUser(state, value) {
            console.log(value)
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