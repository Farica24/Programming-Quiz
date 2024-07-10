const quizData = [
    {
        question: "Which of the following is the correct syntax to print a message in C++?",
        options: [
            "cout << 'Hello, World!';",
            "print('Hello, World!');",
            "printf('Hello, World!');",
            "console.log('Hello, World!');"
        ],
        correct: 0
    },
    {
        question: "Which of the following is used for comments in C++?",
        options: [
            "// comment",
            "/* comment */",
            "# comment",
            "<!-- comment -->"
        ],
        correct: 0
    },
    {
        question: "Which of the following is a valid C++ data type?",
        options: [
            "int",
            "string",
            "float",
            "All of the above"
        ],
        correct: 3
    },
    {
        question: "Which keyword is used to define a function in C++?",
        options: [
            "function",
            "void",
            "func",
            "def"
        ],
        correct: 1
    },
    {
        question: "What is the output of the following code: \n\n```cpp\nint a = 5;\nint b = 10;\ncout << a + b;\n```",
        options: [
            "5",
            "10",
            "15",
            "50"
        ],
        correct: 2
    },
    {
        question: "Which of the following is the correct way to declare a pointer in C++?",
        options: [
            "int *ptr;",
            "int ptr*;",
            "int &ptr;",
            "pointer int *ptr;"
        ],
        correct: 0
    },
    {
        question: "Which of the following is used to create an object in C++?",
        options: [
            "new",
            "malloc",
            "create",
            "alloc"
        ],
        correct: 0
    },
    {
        question: "Which of the following is the correct way to inherit a class in C++?",
        options: [
            "class Derived : public Base",
            "class Derived inherits Base",
            "class Derived extends Base",
            "class Derived derives Base"
        ],
        correct: 0
    },
    {
        question: "Which of the following operators is used to access a class member through a pointer?",
        options: [
            ".",
            "->",
            "::",
            "?"
        ],
        correct: 1
    },
    {
        question: "Which of the following is used to terminate a loop in C++?",
        options: [
            "break",
            "end",
            "terminate",
            "exit"
        ],
        correct: 0
    }
];

let currentQuestion = 0;

document.addEventListener("DOMContentLoaded", loadQuiz);

function loadQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    quizData.forEach((quizItem, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        if (index === 0) questionElement.classList.add('active');
        questionElement.innerHTML = `
            <h2>${quizItem.question}</h2>
            ${quizItem.options.map((option, i) => `
                <label>
                    <input type="radio" name="question${index}" value="${i}">
                    ${i + 1}. ${option}
                </label><br>
            `).join('')}
        `;
        quizContainer.appendChild(questionElement);
    });
    updateButtons();
}

function updateButtons() {
    document.getElementById('prev-btn').style.display = currentQuestion === 0 ? 'none' : 'inline-block';
    document.getElementById('next-btn').style.display = currentQuestion === quizData.length - 1 ? 'none' : 'inline-block';
    document.getElementById('submit-btn').style.display = currentQuestion === quizData.length - 1 ? 'inline-block' : 'none';
}

function showQuestion(index) {
    document.querySelectorAll('.question').forEach((question, idx) => {
        question.classList.toggle('active', idx === index);
    });
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
        updateButtons();
    }
}

function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
        updateButtons();
    }
}

function submitQuiz() {
    let score = 0;
    const solutionBank = document.createElement('div');
    solutionBank.id = 'solution-bank';
    solutionBank.innerHTML = `<h2>Solution Bank</h2><ul></ul>`;

    quizData.forEach((quizItem, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>Q${index + 1}:</strong> ${quizItem.question}<br>
                              <strong>Correct Answer:</strong> ${quizItem.options[quizItem.correct]}`;
        if (selectedOption && parseInt(selectedOption.value) === quizItem.correct) {
            score++;
            listItem.innerHTML += `<br><strong>Your Answer:</strong> ${quizItem.options[parseInt(selectedOption.value)]} <span style="color: green;">(Correct)</span>`;
        } else if (selectedOption) {
            listItem.innerHTML += `<br><strong>Your Answer:</strong> ${quizItem.options[parseInt(selectedOption.value)]} <span style="color: red;">(Incorrect)</span>`;
        } else {
            listItem.innerHTML += `<br><strong>Your Answer:</strong> No answer selected <span style="color: red;">(Incorrect)</span>`;
        }
        solutionBank.querySelector('ul').appendChild(listItem);
    });

    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}`;
    resultContainer.appendChild(solutionBank);
}
