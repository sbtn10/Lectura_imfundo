document.addEventListener('DOMContentLoaded', function () {
    const questions = document.querySelectorAll('.questions-container ol li');
    const modalNext = document.getElementById('modal');
    const flecha = document.querySelector('#arrow-icon');
    const audioCorrecto = new Audio('../audio/correcto.mp3');
    const audioIncorrecto = new Audio('../audio/incorrecto.mp3');

    let lives = 3;
    let currentQuestion = 0;

    function checkAnswer(selectedOption) {
        const correctAnswer = selectedOption.parentElement.querySelector('.correct');
        const selectedAnswer = selectedOption.textContent.trim();

        if (selectedAnswer === correctAnswer.textContent) {
            if (!audioCorrecto.paused) {
                audioCorrecto.currentTime = 0; // Reinicia el audio si aún está reproduciéndose
            }
            audioCorrecto.play();
            selectedOption.style.backgroundColor = 'green';
            currentQuestion++;
            // Desactivar todas las opciones después de responder correctamente
            const options = selectedOption.parentElement.querySelectorAll('button');
            options.forEach(option => {
                option.disabled = true;
                if (option.textContent.trim() === correctAnswer.textContent) {
                    option.classList.add('correct-answer');
                }
            });
            if (currentQuestion === questions.length) {
                flecha.style.display = 'block'; // Muestra la flecha al completar todo el juego
                modalNext.style.display = "flex";
                modalNext.classList.add("show");
                flecha.addEventListener('click', () => {
                    window.location.href = '../final.html';
                });
                setTimeout(() => {
                    modalNext.classList.remove("show");
                    modalNext.classList.add("hide");
                    setTimeout(() => {
                        modalNext.style.display = "none";
                        modalNext.classList.remove("hide");
                    }, 500);
                }, 1200);
            }
        } else {
            if (!audioIncorrecto.paused) {
                audioIncorrecto.currentTime = 0; // Reinicia el audio si aún está reproduciéndose
            }
            audioIncorrecto.play();
            lives--;
        }
    }

    

    questions.forEach(question => {
        const options = question.querySelectorAll('.options button');
        options.forEach(option => {
            option.addEventListener('click', function () {
                checkAnswer(option);
            });
        });
    });

   
});
