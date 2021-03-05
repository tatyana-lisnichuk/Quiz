const option1 = document.querySelector('.option1'),
  option2 = document.querySelector('.option2'),
  option3 = document.querySelector('.option3'),
  option4 = document.querySelector('.option4');

const optionElements = document.querySelectorAll('.option');
// console.log(optionElements);
const question = document.getElementById('question');
//номер вопроса
const numberOfQuestion = document.getElementById('number-of-question');
// console.log(numberOfQuestion);
// колличество всех вопросов
const numberOfAllQuestions = document.getElementById('number-of-all-questions');
console.log(numberOfAllQuestions);

let indexOfQuestion, //индекс текущего вопроса
  indexOfPage = 0; //индекс страницы

const answersTracker = document.getElementById('answers-tracker');//обертка для треккера(точек, обозначающих правильный объект или нет)

const btnNext = document.getElementById('btn-next'); 

let score = 0; //итог викторины

const correctAnswer = document.getElementById('correct-answer');//кол-во правильных ответов
const numberOfAllQuestion2 = document.getElementById('number-of-all-questions-2');//кол-во всх вопросов в модальном окне
const btnTryAgain = document.getElementById('btn-try-again');// кнопка "начать викторину заново"

const questions = [
  {
    question: "Как в JavaScript вычислить процент от числа ?",
    options: [
      "Та в JavaScript вычислить  процент от числа?",
      "Оператор : %",
      "Умножить на кол-во процентов и разделить на 100",
      "Вызвать метод findPrecent()",
    ],
    rightAnswer: 2
  },
  {
    question: "Результат выражения: '13' + 7",
    options: [
      "20",
      "137",
      "undefined",
      "error",
    ],
    rightAnswer: 1
  },
  {
    question: "На JavaScript нельзя писать ",
    options: [
      "Игры",
      "Скрипты для сайтов",
      "Десктопные приложения",
      "Плохо",
    ],
    rightAnswer: 3
  },

];
numberOfAllQuestions.innerHTML = questions.length;

const load = () => {
  question.innerHTML = questions[indexOfQuestion].question;//вывод вопроса
  // мапим ответы
  option1.innerHTML = questions[indexOfQuestion].options[0];
  option2.innerHTML = questions[indexOfQuestion].options[1];
  option3.innerHTML = questions[indexOfQuestion].options[2];
  option4.innerHTML = questions[indexOfQuestion].options[3];
  numberOfQuestion.innerHTML = indexOfPage + 1;//установка номера текущей страницы
   indexOfPage++; //увеличение индекса страницы
};

let completedAnswers = [];//массив для уже заданных вопросов
const randomQuestion = () => {
  let randomNumber = Math.floor(Math.random() * questions.length);
  let hitDuplicate = false;// маркер для проверки одинаковых вопросов
  if (indexOfPage == questions.length) {
    quizOver();
  } else {
    if (completedAnswers.length > 0) {
      completedAnswers.forEach(item => {
        if (item == randomNumber) {
          hitDuplicate = true;
        }
      });
      if (hitDuplicate) {
        randomQuestion();
      } else {
        indexOfQuestion = randomNumber;
        load();
      }
    }
    if (completedAnswers.length == 0) {
      indexOfQuestion = randomNumber;
      load();
    }
  }
  completedAnswers.push(indexOfQuestion);
};
const checkAnswer = element => {
  if (element.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
    element.target.classList.add('correct');
    updateAnswerTracker('correct');
    score++;
  } else {
    element.target.classList.add('wrong');
    updateAnswerTracker('wrong');
  }
  disabledOptions();
};
for (let option of optionElements) {
  option.addEventListener('click', event => checkAnswer(event));
}

const disabledOptions = () => {
  optionElements.forEach(item => {
    item.classList.add('disabled');
    if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
      item.classList.add('correct');
    }
  });
};

// удаляем все классы со всех ответов
const enableOptions = () => {
  optionElements.forEach(item => {
    item.classList.remove('disabled', 'correct', 'wrong');
  });
};

 const answerTracker = () => {
  questions.forEach(() => {
    const div = document.createElement('div');
    answersTracker.appendChild(div);
  });
};

const updateAnswerTracker = status => {
  answersTracker.children[indexOfPage-1].classList.add(`${status}`)
};

//функция, которая не позволит перейти на новый вопрос без ответа на предыдущий
const validate = () => {
  if (!optionElements[0].classList.contains('disabled')) {
    alert('выбери один из вариантов ответа');
  }
  else{
    randomQuestion();
    enableOptions();
  }
};

btnNext.addEventListener('click', () => {
  validate();
});

const quizOver = () => {
  document.querySelector('.quiz-over-modal').classList.add('active');
  correctAnswer.innerHTML = score;
  numberOfAllQuestion2.innerHTML = questions.length;
};
const tryAgain = () => {
  window.location.reload();
};
btnTryAgain.addEventListener('click', tryAgain);
  window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
  });//функция load запустится только, когда загрузится окно