"use strcit";

// Setting the questions with the options and the correct answer.
// Array of objects with all the data so we can loop and check inside of it.
const testTaskData = [
  {
    question: "What Is The Most Used Programming Language In 2022?",
    a: "Java",
    b: "C++",
    c: "JavaScript",
    d: "Python",
    correct: "c",
  },
  {
    question: "Who Is The President Of The United States?",
    a: "Florin Pop",
    b: "Donald Trump",
    c: "Ivan Saldano",
    d: "Joe Biden",
    correct: "d",
  },
  {
    question: "What Does API Stand For In Programming?",
    a: "Apple with pink increased",
    b: "Application Programming Interface",
    c: "Asynchronous Parse Information",
    d: "Application Info Programming",
    correct: "b",
  },
  {
    question: "What Year The Internet Was Invented?",
    a: "1967",
    b: "1983",
    c: "1999",
    d: "none of the above",
    correct: "b",
  },
  {
    question: "What Is The Main Ingredient Of Pizza?",
    a: "Cheese",
    b: "Tomato",
    c: "Flour",
    d: "Olive Oil",
    correct: "a",
  },
  {
    question: "What Does OOP Mean In Programming Languages?",
    a: "Origin Orange Plant ",
    b: "Object Program Creation",
    c: "Operator Objective Process",
    d: "Object-Oriented Programming",
    correct: "d",
  },
];

// Selecting all our project elements so we can manipulate the DOM and change the UI.
const quiz = document.getElementById("quiz");
const answersElsCheck = document.querySelectorAll(".answer");
const questionElement = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const Btn = document.getElementById("submit");
const spinner = document.querySelector(".spinner");

// We start at zero!
let currentQuiz = 0;
let score = 0;

// Calling the main reset app function in the beginning.
loadTheTest();

// The main reset function of the app.
// Here we are simply showing the first question to the user when he starts using the app.
function loadTheTest() {
  questionElement.innerText = testTaskData[currentQuiz].question;
  a_text.innerText = testTaskData[currentQuiz].a;
  b_text.innerText = testTaskData[currentQuiz].b;
  c_text.innerText = testTaskData[currentQuiz].c;
  d_text.innerText = testTaskData[currentQuiz].d;
}

// Here we are checking when the user selects one of the answers(options)
function selectedAnswer() {
  let answer = undefined;
  answersElsCheck.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  // Then we return the selected answer with its id.
  // Notice that the id here will be a letter and later, we will compare it with the correct answer that we have in our array of data.
  return answer;
}

// This is the function that we call when the user deselects one of the answers(options)
function deselectOptions() {
  answersElsCheck.forEach((currentAnswer) => {
    currentAnswer.checked = false;
  });
}

// The main function call when the user selects an answer and then hits submit.
Btn.addEventListener("click", function (e) {
  e.preventDefault();

  const chosenAnswer = selectedAnswer();

  // Here if the user does not select anything, we just return and stop!
  if (!chosenAnswer) return;

  // Comparing the selected answer with the correct answer.
  if (chosenAnswer === testTaskData[currentQuiz].correct) {
    // If correct then we increase our score by one!
    score++;
  }

  // And we deselect to show the next question clean.
  deselectOptions();

  // Also increasing our current quiz by one to show the next question.
  currentQuiz++;

  // Comparing the amount of the current quiz with the length of our array of object to make sure that we have more questions to show.
  if (currentQuiz < testTaskData.length) {
    // If it's smaller then we call our main function to update and show the next question.
    loadTheTest();

    // If not, that means the quiz is finished and we do some UI change.
  } else {
    quiz.style.backgroundColor = "transparent";
    quiz.style.boxShadow = "none";
    quiz.innerHTML = `<h2>Checking Your Answers...</h2>`;
    spinner.classList.add("show-spinner");

    // Here we show a very simple spinner for 3 seconds while checking the result.
    setTimeout(() => {
      spinner.classList.remove("show-spinner");

      quiz.style.backgroundColor = "#f8fafc";

      quiz.style.boxShadow = " 0 0 10px 2px rgba(100, 100, 100, 0.1)";

      //Outputting how much scores we got!
      quiz.innerHTML = `
      <h2>You Answered Correctly At ${score} of ${testTaskData.length} Questions.</h2>
      
      <button onclick="location.reload()">Reload</button>`;
    }, 3000);
  }
});
