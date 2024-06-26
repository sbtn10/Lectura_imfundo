document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.boton');
    const containers = document.querySelectorAll('.contenedor');
    const flecha = document.querySelector('#arrow-icon');
    const modal2 = document.getElementById("modal");
    const maxAttempts = 3;
    let attempts = 0;
    let selectedButton = null;
    let correctMatches = 0;

    buttons.forEach(button => {
        button.addEventListener('click', selectWord);
    });

    containers.forEach(container => {
        container.addEventListener('click', placeWord);
    });
    function selectWord() {
        if (selectedButton) {
            selectedButton.classList.remove('selected'); // Elimina la selección del botón anterior
        }

        selectedButton = this;
        this.classList.add('selected'); // Aplica la selección al botón actual
    }

    function placeWord() {
        if (!selectedButton) return;

        const buttonWord = selectedButton.dataset.word;
        const containerWord = this.dataset.word;

        if (buttonWord === containerWord) {
            const buttonClone = selectedButton.cloneNode(true);
            this.innerHTML = ''; // Elimina cualquier contenido existente en el contenedor
            this.appendChild(buttonClone); // Agrega el clon del botón al contenedor
             this.classList.add('correct');
            selectedButton.classList.add('destroyed');
            correctMatches++;
            checkCompletion();
        } else {
            attempts++;
        }

        selectedButton.classList.remove('selected');
        selectedButton = null;
    }

    function checkCompletion() {
        if (correctMatches === containers.length) {
            flecha.style.display = 'block'; // Muestra la flecha al completar todo el juego
            modal2.style.display="flex";
            modal2.classList.add("show");
            flecha.addEventListener('click', () => {
                window.location.href = '../final.html'; // Redirige a final.html al hacer clic en la flecha
            });
            setTimeout(() => {
                modal2.classList.remove("show");
                modal2.classList.add("hide");
                setTimeout(() => {
                    modal2.style.display = "none";
                    modal2.classList.remove("hide");
                }, 500); 
            }, 1200);
        }
    }

    function showGameOver() {
        const gameOverModal = document.querySelector('#gameOverModal');
        gameOverModal.style.display = 'block';
        document.querySelector('#reintentarBtn').addEventListener('click', () => location.reload());
        document.querySelector('#salirBtn').addEventListener('click', () => window.location.href = '../index.html');
    }

    function animateHeartDisappearance(heart) {
        heart.style.transition = 'opacity 0.5s ease-out'; // Agrega una transición para el efecto de desvanecimiento
        heart.style.opacity = '0'; // Reduce gradualmente la opacidad del corazón hasta que desaparezca
        setTimeout(() => {
            heart.style.display = 'none'; // Oculta el corazón después de que termine la animación
        }, 500); // La duración de la transición es de 0.5 segundos
    }
});

