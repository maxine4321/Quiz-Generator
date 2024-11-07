let currentSection = '';
let currentQuestionIndex = 0;
let score = 0;
let answered = false;  

function startQuiz(section) {
  currentSection = section;
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById('section-selection').classList.add('hidden');
  document.getElementById('quiz-section').classList.remove('hidden');
  showQuestion();
}

function showQuestion() {
  const questionObj = questions[currentSection][currentQuestionIndex];
  document.getElementById('question').textContent = questionObj.question;
  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';
  answered = false;  

  questionObj.options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option, btn);
    optionsDiv.appendChild(btn);
  });

  document.getElementById('next').classList.add('hidden');  
}

function checkAnswer(selectedOption, btn) {
  if (answered) return;  

  const questionObj = questions[currentSection][currentQuestionIndex];
  const correctAnswer = questionObj.answer;

  if (selectedOption === correctAnswer) {
    score++;
    btn.classList.add('correct');  // Highlight correct answer in green
  } else {
    btn.classList.add('wrong');  // Highlight selected wrong answer in red

    // Highlight the correct answer in green
    const optionsDiv = document.getElementById('options');
    Array.from(optionsDiv.children).forEach(optionBtn => {
      if (optionBtn.textContent === correctAnswer) {
        optionBtn.classList.add('correct');
      }
    });
  }

  answered = true;  // Mark this question as answered
  document.getElementById('next').classList.remove('hidden');  // Show "Next" button
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions[currentSection].length) {
    showQuestion();
  } else {
    showResult();
  }
  document.getElementById('next').classList.add('hidden');  // Hide "Next" button for next question
}

function showResult() {
  document.getElementById('quiz-section').classList.add('hidden');
  document.getElementById('result-section').classList.remove('hidden');
  document.getElementById('score').textContent = score + '/' + questions[currentSection].length;
}

function restartQuiz() {
  document.getElementById('result-section').classList.add('hidden');
  document.getElementById('section-selection').classList.remove('hidden');
}
