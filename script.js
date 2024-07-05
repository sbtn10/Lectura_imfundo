var clicado = false; // Variable para controlar si la flecha ha sido clicada

function reproducirSonidoHover() {
    var sonidoHover = document.getElementById('hoverSound');
    sonidoHover.volume = 0.1;
    sonidoHover.currentTime = 0; // Reinicia el sonido para reproducirlo desde el principio
    sonidoHover.play();
}

// Event listeners para los botones
for (let i = 1; i <= 20; i++) {
    let button = document.getElementById(`btn${i}`);
    button.addEventListener('mouseover', reproducirSonidoHover);
    button.addEventListener('click', handleModule);
}

function handleModule(event) {
    const modulo = event.target.dataset.module; // Obtener el número de módulo del botón
    const moduloEnlace = clicado ? parseInt(modulo) + 6 : parseInt(modulo); // Ajustar el número de módulo en función de si la flecha está clicada o no
    window.location.href = `./lectura${moduloEnlace}/lectura${moduloEnlace}.html`; // Redirigir al módulo correspondiente
}

var audio = document.getElementById('audioElement');
audio.volume = 0.3;

// Event listener para la flecha que cambia el valor de clicado
document.getElementById('arrowButton').addEventListener('click', function() {
    clicado = !clicado; // Cambia el valor de clicado cada vez que se hace clic en la flecha
});
