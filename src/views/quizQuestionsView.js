import iconCorrect from '../assets/images/icon-correct.svg'
import iconIncorrect from '../assets/images/icon-correct.svg'

class QuizQuestionsView {
  _parentElement = document.querySelector('main');
  _errorDiv = document.querySelector('.error')

  // _scoreEl = document.querySelector('')
    
    render(quiz, questionObj, index) {
        this._parentElement.innerHTML = `
        <div >
        <header class="flex pl-2 pr-2 mb-9 items-center justify-between">
        <div class="flex items-center gap-2">
        <div class="p-2 bg-white">
        <img class="size-5" src="./src/assets/images/icon-${quiz.title.toLowerCase()}.svg" alt="${quiz.title} icon" />
        </div>
        <p class="dark:text-white text-black">${quiz.title}</p>
        </div>
        
        </header>  
        </div>
        
        <div class="lg:flex justify-center gap-40">
        <div class="lg:flex lg:w-[40%] flex-col gap-20">
        <div>
        <p class="text-gray-400 italic mb-5">Question ${index + 1} of 10</p>
        <p class="text-2xl lg:text-[20px] dark:text-white font-bold">
        ${questionObj.question}
        </p>
        </div>
        
        <p class="question-tracker mt-4 mb-8 bg-white rounded pt-0.5 pb-0.5 h-2">
        <span class="bg-purple-900 block rounded h-[100%]" style=" width:${(index / 10) * 100}%;"></span>
        </p>
        </div>

        <form class="lg:w-[50%] flex flex-col gap-5 question-form" id="question-form'>
        <div class="dark:bg-white flex  rounded p-4">
          ${questionObj.options.map((opt, i) => `
            <label data-answer="${opt}"  class="label relative flex items-center lg:p-2 cursor-pointer gap-3 dark:text-white dark:bg-gray-600 bg-white shadow rounded-md hover:bg-purple-400 transition-all">
            <input
            id="todo-checkbox"
            type="radio"
            name="answer"
            value="${opt}"
            class=" peer appearance-none w-10 h-10 border-2 border-gray-200 rounded dark:bg-white checked:bg-gradient-to-r from-blue-600 to-purple-600 transition-all"
            />
            
            <!-- Checkmark Icon -->
            <span  class="absolute left-5  opacity-100 peer-checked:opacity-100 transition-opacity text-2xl dark:text-black">${i === 0 ? 'A' : 
              i === 1 ? 'B' :
              i === 2 ? 'C' : 'D'}</span>
            <span class="ml-2 transition-colors font-bold duration-300">"${opt}"</span>
            </label>
          `)
             .join('')
      
          }  
          <div >
            <button class="p-4 mt-5 opacity-60 bg-purple-900 text-center text-white cursor-pointer w-[100%] hover:bg-purple-500 transition-all">Submit Answer</button>
          </div>
          </form>
        </div>
        
        

        
            </div>`
    }


    addHandlerSubmit(handler) {
      // const form = this._parentElement.querySelector('form')
      const form = document.querySelector('.question-form');
      const allOption = Array.from(document.querySelectorAll('label'));
      const errorDiv = document.querySelector('.error');
      const nextBtn = form.querySelector('button');

      allOption.forEach(o => {
        o.addEventListener('click', function(){
          nextBtn.innerText = 'Next Question'
          nextBtn.style.opacity = '1';
        })
      })

      nextBtn.addEventListener('click', function() {
        nextBtn.style.backgroundColor = 'hsl(62.7% 0.265 303.9)'
      })

      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const selected = document.querySelector('input[name="answer"]:checked');

        if (!selected) {
          errorDiv.classList.remove('hidden')
          return
        }else {
          errorDiv.classList.add('hidden')
        }
        const label = selected.closest('label')
        // iconCheckpass.classList.remove('hidden')
        // iconCheckpass.src = `${iconIncorrect}`
        label.style.backgroundColor = 'red'
        handler(selected.value, allOption)
      })
    }
}

export default new QuizQuestionsView()