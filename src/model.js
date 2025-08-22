import quizData from './data.json';

const {quizzes} = quizData
// console.log(quizzes, quizData);
export const state = {
    quizzes: quizzes,
    currentQuiz: null,
    currentQuestionIndex: 0,
    score: 0,
}

export function selectQuiz(title) {
    state.currentQuiz = state.quizzes.find(q => q.title === title);
    state.currentQuestionIndex = 0;
    state.score = 0;
}

export function getCurrentQuestion() {
    return state.currentQuiz.questions[state.currentQuestionIndex] 
}

export function nextQuestion() {
    return state.currentQuiz.questions[state.currentQuestionIndex++]
}

export function submitAnswer(selectedOption) {
    const question = getCurrentQuestion();
    if(selectedOption === question.answer) {
       state.score++;
    }
        state.currentQuestionIndex++
}

export function isQuizOver() {
    return state.currentQuestionIndex >= state.currentQuiz.questions.length;
}

console.log(state.quizzes);
