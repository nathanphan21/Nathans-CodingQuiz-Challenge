var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;


var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');


var sfxRight = new Audio('assets/sfx/correct.wav');
var sfxWrong = new Audio('assets/sfx/incorrect.wav');

startBtn.addEventListener("click", function() {
    document.getElementById("start-screen").style.display = "none"
    questionsEl.style.display = "block";

    nextQuestion()
})


function nextQuestion() {
    if (currentQuestionIndex < questions.length) {
      var currentQuestion = questions[currentQuestionIndex];
  
      // Display the question text
      document.getElementById('question-title').textContent = currentQuestion.title;
  
      // Clear previous answer choices
      choicesEl.innerHTML = '';
  
      // Create answer choice buttons
      currentQuestion.choices.forEach(function (choices) {
        var choiceButton = document.createElement('button');
        choiceButton.textContent = choices;
  
        // Add click event listener to check the answer
        choiceButton.addEventListener('click', function () {
          checkAnswer(choices, currentQuestion.answer);
        });
  
        choicesEl.appendChild(choiceButton);
      });
  
      // Increment the question index
      currentQuestionIndex++;
    } else {
      // All questions have been answered, end the quiz
      endQuiz();
    }
  }


  function checkAnswer(selectedAnswer, answer) {
    // Check if the selected answer is correct
    if (selectedAnswer === answer) {
      // Play a sound for correct answers (you can add more feedback as needed)
      sfxRight.play();
    } else {
      // Play a sound for incorrect answers and penalize time (e.g., 15 seconds)
      sfxWrong.play();
      // You can subtract time here if needed
    }
  
    // Load the next question
    nextQuestion();
  }
  

  function endQuiz() {
    // Hide the questions element
    questionsEl.style.display = 'none';
  
    // Display the end screen
    var endScreen = document.getElementById('end-screen');
    endScreen.style.display = 'block';
  
    // Calculate and display the final score
    var finalScore = calculateScore(); // You should implement this function
    document.getElementById('final-score').textContent = finalScore;
  
    // Handle the submission of initials
    submitBtn.addEventListener('click', function () {
      var initials = initialsEl.value.trim();
  
      if (initials !== '') {
        // You can save the score and initials to a high scores list here
        // You should implement this part based on your storage or data structure
        // For now, you can just display a message
        feedbackEl.textContent = 'Score submitted!';
  
        // Clear the initials input field
        initialsEl.value = '';
      } else {
        // Display an error message if initials are empty
        feedbackEl.textContent = 'Please enter your initials.';
      }
    });
  
}
  
  
  
  
  