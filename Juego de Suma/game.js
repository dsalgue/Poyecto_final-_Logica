document.addEventListener('DOMContentLoaded', () => {
    const num1Element = document.getElementById('num1');
    const num2Element = document.getElementById('num2');
    const operationElement = document.getElementById('operation');
    const answerInput = document.getElementById('answer');
    const submitButton = document.getElementById('submit');
    const feedbackElement = document.getElementById('feedback');
    const scoreElement = document.getElementById('score');
    const levelElement = document.getElementById('level');
    const timerElement = document.getElementById('timer');
    const levelUpSound = document.getElementById('levelUpSound');
    const rewardImage = document.getElementById('rewardImage');

    let score = 0;
    let level = 1;
    let num1, num2, operation;
    let timeRemaining;
    let timerInterval;

    const successSound = new Audio('success.mp3');
    const rewardSound = new Audio('reward.mp3'); 

    function generateProblem() {
        clearInterval(timerInterval);
        const maxNumber = level * 1;
        num1 = Math.floor(Math.random() * maxNumber) + 1;
        num2 = Math.floor(Math.random() * maxNumber) + 1;

        if (level <= 5) {
            operation = '+';
        } else if (level <= 10) {
            operation = Math.random() > 0.5 ? '+' : '-';
        } else {
            const operations = ['+', '-', '*'];
            operation = operations[Math.floor(Math.random() * operations.length)];
        }

        num1Element.textContent = num1;
        num2Element.textContent = num2;
        operationElement.textContent = operation;
        answerInput.value = '';
        answerInput.focus();
        timeRemaining = 10;
        timerElement.textContent = timeRemaining;
        timerInterval = setInterval(updateTimer, 1000);
        rewardImage.style.display = 'none';
    }

    function updateTimer() {
        timeRemaining--;
        timerElement.textContent = timeRemaining;
        if (timeRemaining === 0) {
            clearInterval(timerInterval);
            feedbackElement.textContent = 'Tiempo agotado. Nivel reiniciado.';
            feedbackElement.style.color = 'red';
            level = 1;
            score = 0;
            scoreElement.textContent = score;
            levelElement.textContent = level;
            generateProblem();
        }
    }

    function checkAnswer() {
        const userAnswer = parseInt(answerInput.value, 10);
        let correctAnswer;
        switch (operation) {
            case '+':
                correctAnswer = num1 + num2;
                break;
            case '-':
                correctAnswer = num1 - num2;
                break;
            case '*':
                correctAnswer = num1 * num2;
                break;
        }

        if (userAnswer === correctAnswer) {
            feedbackElement.textContent = '¡Correcto!';
            feedbackElement.style.color = 'green';
            score += level;
            if (score >= level * 1) {
                level++;
                feedbackElement.textContent += ' ¡Nivel aumentado!';
                feedbackElement.classList.add('highlight');
                levelUpSound.play();
                successSound.play();
                if (level % 5 === 0) { // Recompensa cada 5 niveles
                    feedbackElement.textContent += ' ¡Recompensa obtenida!';
                    rewardSound.play('show-reward');
                    rewardImage.classList.add('show-reward');
                    rewardImage.style.display = 'block';
                }
                setTimeout(() => {
                    feedbackElement.classList.remove('highlight');
                }, 1000);
            }
        } else {
            feedbackElement.textContent = 'Incorrecto. Intenta de nuevo.';
            feedbackElement.style.color = 'red';
        }
        scoreElement.textContent = score;
        levelElement.textContent = level;
        generateProblem();
    }

    submitButton.addEventListener('click', checkAnswer);
    answerInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });

    generateProblem();
});
