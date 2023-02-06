export default {
    namespaced: true,
    actions: {},
    mutations: {
        PKExercise(state, value) {
            console.log('-----', value);
            state.exercise = value;
            console.log('-----', state.exercise);
        },
        userAnswer(state, value) {
            state.answer = value;
            console.log('存储store，', state.answer)
        },
        totalTime(state, value) {
            state.time = value;
            console.log("存储time", state.time)
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