const quizData = [
    {
      question: 'Siapa Kepala Sekolah SMK Telkom Purwokerto?',
      options: ['Bapak Wiwid Widyantoro', 'Bapak Wiwid Widyantiri', 'Ibu Berlian', 'Ibu Firda'],
      answer: 'Bapak Wiwid Widyantoro',
    },
    {
      question: 'Siapa Guru Terbaik di SMK Telkom Purwokerto?',
      options: ['Bu Firda', 'Pak Barep', 'Bu Berlian', 'Pak Yogi'],
      answer: 'Bu Firda',
    },
    {
      question: 'Siapa Presiden Ke-7 Di Indonesia?',
      options: ['Ir. Soekarno', 'Ofi Andre Khoiruniza', 'Jokowi dodo', 'Joe Biden'],
      answer: 'Jokowi dodo',
    },
    {
      question: 'Nama panjang dari Andre?',
      options: ['Ofi Andre Khoiruniza', 'Ovi Andre hoiruniza', 'Ofi Andre Khoirunisa', 'Ovi Andre hoirunisa'],
      answer: 'Ofi Andre Khoiruniza',
    },
    {
      question: 'Singkatan dari HTML?',
      options: [
        'HyperText Markup Language',
        'HondaTiger Motor Lawas',
        'HaiperTeks Markup Language',
        'HahaText Markup Language',
      ],
      answer: 'HyperText Markup Language',
    },
    {
      question: 'Makanan Ter-Enak di Kantin SMK Telkom Purwokerto?',
      options: ['Mie Gacor', 'Ayam Geprek + Rambak', 'Telur Geprek + Rambak', 'Seblak'],
      answer: 'Ayam Geprek + Rambak',
    },
    {
      question: 'Siapa Penemu HTML dan tahun berapa ditemukannya?',
      options: [
        'Alok bin Kelly Pada 1995',
        'Vincent van Gogh Pada 1993',
        'Leonardo da HTML Pada 1991',
        'Tim Berners-Lee Pada 1991',
      ],
      answer: 'Tim Berners-Lee Pada 1991',
    },
    {
      question: 'Siapa Penemu JavaScript?',
      options: ['Tim Berners-Lee', 'Eric Tohir', 'Brendan Eich', 'Bill Gates'],
      answer: 'Brendan Eich',
    },
    {
      question: 'Hewan Terbesar Didunia?',
      options: [
        'Megalodon',
        'Semut Raksasa',
        'Kecoa Kayang',
        'Paus Biru',
      ],
      answer: 'Paus Biru',
    },
    {
      question: 'Berapa Jumlah Planet di Tata Surya Kita?',
      options: ['1', '8', '9', '7'],
      answer: '8',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `Skor Kamu ${score} dari ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Pertanyaan:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Kamu menjawab:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Jawaban Benar:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>Skor Kamu ${score} Dari ${quizData.length}!</p>
      <p>Jawaban Yang Salah:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();