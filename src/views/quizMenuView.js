import iconCSS from "../assets/images/icon-css.svg";
import iconHTML from "../assets/images/icon-html.svg";
import iconJS from "../assets/images/icon-javascript.svg";
import iconACCESSIBILITY from "../assets/images/icon-accessibility.svg";

class QuizMenu {
  _parentElement = document.querySelector("main");
  

  render(quizzes) {
    this._parentElement.innerHTML = `
    <section class="">
      <div class="mt-10 lg:flex lg:gap-30 justify-center animate-fade-in">
        <div class="mb-10 flex flex-col gap-5 font-rubik">
          <h1 class="text-4xl mb-3 text-black dark:text-white">
            <span class="lg:text-gray-400 text-gray-800">Welcome to the</span>
            <br />
            <b>Frontend Quiz!</b>
          </h1>
          <p class="text-gray-400 italic">Pick a subject to get started.</p>
        </div>
        

          <div class="cursor-pointer lg:w-[50%] animate-fade-in font-rubik">
          ${quizzes
            .map(
              (q) => ` 
            <div data-title="${
              q.title
            }" class="quiz-btn p-2 hover:bg-purple-400 rounded shadow-2xl bg-white dark:text-white dark:bg-gray-700 mb-3 flex items-center gap-5 transition-transform duration-300 ease-in-out hover:scale-105">
            <div class="p-3 bg-white rounded-2xl">
            <img src="${
              q.title.toLowerCase() === "css"
                ? iconCSS
                : q.title.toLowerCase() === "html"
                ? iconHTML
                : q.title.toLowerCase() === "javascript"
                ? iconJS
                : q.title.toLowerCase() === "accessibility"
                ? iconACCESSIBILITY
                : ""
            }" class="size-7" alt="${q.title}">
            </div>  
              <p class="text-2xl">${q.title}</p>
            </div>`
            )
            .join("")}
          </div>
    </section>
        `;
  }

  addHandlerSelect(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".quiz-btn");
      if (!btn) return;
      handler(btn.dataset.title);
    });
  }
}

export default new QuizMenu();
