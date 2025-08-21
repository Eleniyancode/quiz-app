class ResultView {
    _parentElemet = document.querySelector('main');


    render(score, quiz) {
        this._parentElemet.innerHTML = `
            <section class="">
        <div class="">
          <header class="flex w-[100%] justify-between items-center pl-2 pr-2 mb-19">
            <div class="flex gap-2">
              <img class="size-5" src="./src/assets/images/icon-${quiz.title.toLowerCase()}.svg" alt="" />
              <p>${quiz.title}</p>
            </div>
            
          </header>
        </div>

        <div class="bg-white text-center rounded p-5 flex flex-col gap-5">
          <div class="flex ml-auto mr-auto gap-2">
            <img src="./src/assets/images/icon-${quiz.title.toLowerCase()}.svg" class="size-7 inline-block" alt="" />
            <p>${quiz.title}</p>
          </div>

          <div>
            <p class="text-7xl">${score}</p>
            <p class="text-gray-400">out of 10</p>
          </div>

        </div>

         <div class="reset-btn p-4 mt-3 bg-purple-900 text-center text-white cursor-pointer">
            <button class="w-[100%] h-[100%] cursor-pointer">Play Again</button>
          </div>
      </section>
        `
    }

    addHandlerReset(handler) {
        this._parentElemet.addEventListener('click', function(e) {
            const resetBtn = e.target.closest('.reset-btn')
            if (!resetBtn) return
            resetBtn.addEventListener('click', function() {
                handler()
            })
        })
    }

}

export default new ResultView();