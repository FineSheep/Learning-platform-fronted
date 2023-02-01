export default {
    namespaced: true,
    actions: {},
    mutations: {
        PKExercise(state, value) {
            console.log('-----', value);
            state.exercise = value;
            console.log('-----', state.exercise);

        }
    },
    state: {
        exercise: {}
    },
    getters: {
        getRadio(state) {
            return state.exercise[0];

        },
        getMulChoice(state) {
            return state.exercise[1];

        },

    }

}