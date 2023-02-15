export default {
    namespaced: true,
    actions: {},
    mutations: {
        PKExercise(state, value) {
            state.exercise = value;
        },
        userAnswer(state, value) {
            state.answer = value;
        },
        totalTime(state, value) {
            state.time = value;
        }
    },
    state: {
        exercise: {},
        answer: {},
        time: 0
    },
    getters: {
        getRadio(state) {
            return state.exercise[0];
        },
        getMulChoice(state) {
            return state.exercise[1]
        },
        getAnswers(state) {
            return state.answer;
        },
        getTime(state) {
            return state.time;
        }
    }

}