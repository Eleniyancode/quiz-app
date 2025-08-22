import iconCSS from "../assets/images/icon-css.svg";
import iconHTML from "../assets/images/icon-html.svg";
import iconJS from "../assets/images/icon-javascript.svg";
import iconACCESSIBILITY from "../assets/images/icon-accessibility.svg";
import { escapeHTML } from "../helper";

class QuizQuestionsView {
  _parentElement = document.querySelector("main");
  _errorDiv = document.querySelector(".error");
  _timerInterval;

  // _scoreEl = document.querySelector('')

  render(quiz, questionObj, index) {
    this._parentElement.innerHTML = `
        <div class="font-rubik">
        <header class="flex pl-2 pr-2 mb-9 items-center justify-between font-rubik">
        <div class="flex items-center gap-2">
        <div class="p-2 bg-white">
                   <img src="${
                     quiz.title.toLowerCase() === "css"
                       ? iconCSS
                       : quiz.title.toLowerCase() === "html"
                       ? iconHTML
                       : quiz.title.toLowerCase() === "javascript"
                       ? iconJS
                       : quiz.title.toLowerCase() === "accessibility"
                       ? iconACCESSIBILITY
                       : ""
                   }" class="size-7" alt="${quiz.title}">
        </div>
        <p class="dark:text-white text-black font-rubik">${quiz.title}</p>
        </div>
        </header>  
        </div>
        
        <div class="timer-container text-center">
        </div>

        <div class="lg:flex justify-center gap-40">
        <div class="lg:flex lg:w-[40%] flex-col gap-20">
        <div class="animate-fade-in">
        <p class="text-gray-400 italic mb-5">Question ${index + 1} of 10</p>
        <p class="text-2xl lg:text-[20px] dark:text-white font-bold font-rubik">
        ${escapeHTML(questionObj.question)}
        </p>
        </div>
        
        <p class="question-tracker mt-4 mb-8 bg-white rounded pt-0.5 pb-0.5 h-2">
        <span class="bg-purple-900 block rounded h-[100%]" style=" width:${
          (index / 10) * 100
        }%;"></span>
        </p>
        </div>

        <form class="lg:w-[50%] flex flex-col gap-5 question-form" id="question-form'>
        <div class="dark:bg-white flex  rounded p-4">
          ${questionObj.options
            .map(
              (opt, i) => `
            <label data-answer="${opt}"  class="label relative flex items-center lg:p-2 cursor-pointer gap-3 dark:text-white dark:bg-gray-600 bg-white shadow rounded-md hover:bg-purple-400 animate-fade-in transition-transform duration-300 ease-in-out hover:scale-105">
            <input
            id="todo-checkbox"
            type="radio"
            name="answer"
            value="${opt}"
            class=" peer appearance-none w-10 h-10 border-2 border-gray-200 rounded dark:bg-white checked:bg-gradient-to-r from-blue-600 to-purple-600 transition-all"
            />
            
            <!-- Checkmark Icon -->
            <span  class="absolute left-3 lg:left-5 font-rubik  opacity-100 peer-checked:opacity-100 transition-opacity text-2xl dark:text-black">${
              i === 0 ? "A" : i === 1 ? "B" : i === 2 ? "C" : "D"
            }</span>
            <span class="ml-2 transition-colors duration-300 font-rubik">"${escapeHTML(
              opt
            )}"</span>
            </label>
          `
            )
            .join("")}  
          <div class="transition-transform duration-300 ease-in-out hover:scale-105" >
            <button class="p-4 mt-5 opacity-60 bg-purple-900 text-center text-white font-rubik cursor-pointer w-[100%] hover:bg-purple-500 transition-all">Submit Answer</button>
          </div>
          </form>
        </div>
            </div>`;
  }

  renderCountdown(seconds) {
    clearInterval(this._timerInterval);
    const timerContainer = document.querySelector(".timer-container");
    timerContainer.innerHTML = `<p class= "dark:text-white text-black font-rubik">Time left: <span class="timer font-rubik"> ${seconds}</span>s</p>`;
    this._timerInterval = setInterval(() => {
      let secEl = timerContainer.querySelector(".timer");
      let time = parseInt(secEl.textContent, 10) - 1;
      if (time < 0) {
        clearInterval(this._timerInterval);
        this.onTimeUp && this.onTimeUp();
      } else {
        secEl.textContent = time;
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this._timerInterval);
  }

  addHandlerSubmit(handler) {
    // const form = this._parentElement.querySelector('form')
    const form = document.querySelector(".question-form");
    const allOption = Array.from(document.querySelectorAll("label"));
    const errorDiv = document.querySelector(".error");
    const nextBtn = form.querySelector("button");

    // allOption.forEach(o => {
    //   o.addEventListener('click', function(){
    //     nextBtn.innerText = 'Next Question'
    //     nextBtn.style.opacity = '1';
    //   })
    // })

    // if (index === 9) {
    //   nextBtn.textContent = 'Get Result'
    // }

    nextBtn.addEventListener("click", function () {
      nextBtn.style.backgroundColor = "hsl(62.7% 0.265 303.9)";
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const selected = document.querySelector('input[name="answer"]:checked');

      if (!selected) {
        errorDiv.classList.remove("hidden");
        return;
      } else {
        errorDiv.classList.add("hidden");
      }
      const label = selected.closest("label");
      // iconCheckpass.classList.remove('hidden')
      // iconCheckpass.src = `${iconIncorrect}`
      label.style.backgroundColor = "red";
      handler(selected.value, allOption, nextBtn);
    });
  }
}

export default new QuizQuestionsView();
