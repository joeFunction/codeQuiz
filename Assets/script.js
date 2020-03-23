const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  selectNextQuestion()
})

function startGame() {
  console.log('Started')
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  selectNextQuestion()
}

function selectNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}
function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild
    )
  }
}
function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = "Restart"
    startButton.classList.remove('hide')
  }
}

nextButton.classList.remove('hide')

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Which of the following operator returns the remainder left over when one operand is divided by a second operand?',
    answers: [
      { text: '%', correct: true },
      { text: '/', correct: false },
      { text: '+', correct: false },
      { text: '--', correct: false }
    ]
  },
  {
    question: 'Which of the following keywords will you use to declare a numeric variable in JavaScript?',
    answers: [
      { text: 'float', correct: false },
      { text: 'int', correct: false },
      { text: 'var', correct: true },
      { text: 'double', correct: false }
    ]
  },
  {
    question: 'How do you get a size of an array?',
    answers: [
      { text: 'arr.length', correct: true },
      { text: 'sizeOf(arr)', correct: false },
      { text: 'arr.size()', correct: false },
      { text: 'arr.size', correct: false }
  
    ]
  },
  {
    question: 'What does the function return if it does not have a return statement?',
    answers: [
      { text: 'this', correct: false },
      { text: 'null', correct: false },
      { text: 'throws an exception', correct: false },
      { text: 'undefined', correct: true }
    ]
  },
]

