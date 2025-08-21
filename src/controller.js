import '../style.css';
import * as model from './model.js'
import quizMenuView from './views/quizMenuView.js';
import quizQuestionsView from './views/quizQuestionsView.js';
import resultView from './views/resultView.js';
import iconSun from './assets/images/icon-sun-light.svg'
import iconMoon from './assets/images/icon-moon-light.svg'
import iconDarkSun from './assets/images/icon-sun-dark.svg'
import iconDarkMoon from './assets/images/icon-moon-dark.svg'

// setting up the theme toggling functionality
const themeSunIcon = document.querySelector('.theme-sun-icon');
const themeMoonIcon = document.querySelector('.theme-moon-icon');
const body = document.querySelector('body')
const html = document.documentElement;

// Load saved theme from localstorage
if(localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark')
}

let clicked = true;
body.addEventListener('click', function(e) {
    const toggleSwitch = e.target.closest('.toggle-switch')
    if (!toggleSwitch) return
    if (clicked) {
        themeSunIcon.src = `${iconSun}`
        themeMoonIcon.src = `${iconMoon}`
        toggleSwitch.style.justifyContent = 'flex-end'
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark')
            
        } else {
            themeSunIcon.src = `${iconDarkSun}`
            themeMoonIcon.src = `${iconDarkMoon}`
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light')
            toggleSwitch.style.justifyContent = 'flex-start'
        }
        clicked = !clicked;
})



// controlling the display of the quiz meny 
const controlQuizMenu = function() {
    //render the view
    quizMenuView.render(model.state.quizzes);
    quizMenuView.addHandlerSelect(controlSelectQuiz);
}

const controlSelectQuiz = function(title) {
    model.selectQuiz(title);
    controlQuestion();   
}

const controlResult = function() {
    const quiz = model.state.currentQuiz;
    const score = model.state.score

    resultView.render(score, quiz)

    resultView.addHandlerReset(controlReset)

}

const controlQuestion = function() {
    const question = model.getCurrentQuestion();
    const index = model.state.currentQuestionIndex;
    const quiz = model.state.currentQuiz;

    quizQuestionsView.render(quiz, question, index);

    quizQuestionsView.addHandlerSubmit(controlSubmit);
    // console.log(model.state.score);
}

function controlSubmit(selectedOption, allOption) {
    const question = model.getCurrentQuestion();
    const answer = question.answer
    
    // console.log(allOption);
    const correctOption = allOption.find(o => o.dataset.answer === answer)
    correctOption.style.backgroundColor = 'green';

    setInterval(() => {
        if (correctOption.style.backgroundColor === 'green') {
            correctOption.style.backgroundColor = 'white';
        }else {
            correctOption.style.backgroundColor = 'green';
        }
    }, 300)
    
    
    model.submitAnswer(selectedOption);

    if (model.isQuizOver()) {
        setTimeout(() => {
            controlResult();
        }, 2000)
    }else {
        setTimeout(() => {
            controlQuestion();
        }, 3000)
    }
}

function controlReset() {
    quizMenuView.render(model.state.quizzes)

    model.state.score = 0
}


const init = function() {
    controlQuizMenu();
}

init()