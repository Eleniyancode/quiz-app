class QuizMenu {
    _parentElement = document.querySelector('main');
    // _htmlQuizEl = document.getElementById('html')
    // _cssQuizEl = document.querySelector('#css')
    // _javascriptQuizEl = document.querySelector('#javascript')
    // _accessibilityQuizEl = document.querySelector('#accessibility')


    render(quizzes) {
        this._parentElement.innerHTML = `
            <section class="">
      <div class="mt-10 lg:flex lg:gap-30 justify-center ">
        <div class="mb-10 flex flex-col gap-5">
          <h1 class="text-4xl mb-3 text-black dark:text-white">
            <span class="lg:text-gray-400 text-gray-800">Welcome to the</span>
            <br />
            <b>Frontend Quiz!</b>
          </h1>
          <p class="text-gray-400 italic">Pick a subject to get started.</p>
        </div>
        

          <div class="cursor-pointer lg:w-[50%]">
          ${quizzes.map(q =>` 
            <div data-title="${q.title}" class="quiz-btn p-4 hover:bg-purple-400 rounded shadow-2xl bg-white dark:text-white dark:bg-gray-700 mb-3 flex items-center gap-5">
            <div class="p-3 bg-white rounded-2xl">
            <img src="./src${q.icon.slice(1)}" class="size-7" alt="${q.title}">
            </div>  
              <p class="text-2xl">${q.title}</p>
            </div>`
          )
          .join('')
        }
          </div>
       </section>
        `
        // this._parentElement.insertAdjacentHTML('beforeend', markup)
    }

    addHandlerSelect(handler) {
      this._parentElement.addEventListener('click', function (e) {
        const btn = e.target.closest('.quiz-btn');
        if (!btn) return;
        handler(btn.dataset.title);
      })
    }
}

export default new QuizMenu();