var clicado = false; // Variable para controlar si la flecha ha sido clicada
var timeoutID; // Variable para almacenar el ID del timeout

function reproducirSonidoHover(event) {
    var sonidoHover = document.getElementById('hoverSound');
    sonidoHover.volume = 0.1;
    sonidoHover.currentTime = 0; // Reinicia el sonido para reproducirlo desde el principio
    sonidoHover.play();
    
    // Obtener el número de módulo del botón
    const modulo = this.getAttribute('data-module');
    
    // Mostrar la descripción correspondiente al módulo
    switch (modulo) {
        case '1':
            buttonDescription.textContent = 'LOS APELLIDOS HISPANOS';
            break;
        case '2':
            buttonDescription.textContent = 'LA FAMILIA EN EL MUNDO LATINO';
            break;
        case '3':
            buttonDescription.textContent = 'LIMA, UNA CIUDAD MULTICULTURAL';
            break;
        case '4':
            buttonDescription.textContent = 'LAS CASONAS COLONIALES';
            break;
        case '5':
            buttonDescription.textContent = 'TREN AL SUR DE CHILE';
            break;
        case '6':
            buttonDescription.textContent = 'BRASIL CARVANAL';
            break;
        case '7':
            buttonDescription.textContent = 'CULTURA PANAMEÑA';
            break;
        case '8':
            buttonDescription.textContent = 'LOS MALECONES MÁS BONITOS DE LATINOAMÉRICA';
            break;
        case '9':
            buttonDescription.textContent = 'GASTRONOMÍA PERUANA';
            break;
        case '10':
            buttonDescription.textContent = 'SABOR A MÉXICO';
            break;
        case '11':
            buttonDescription.textContent = 'GABRIEL GARCÍA MÁRQUEZ';
            break;
        case '12':
            buttonDescription.textContent = 'LA CIVILIZACIÓN INCA';
            break;
        case '13':
            buttonDescription.textContent = 'LAS MARAVILLAS DE AMÉRICA';
            break;
        case '14':
            buttonDescription.textContent = 'CHASQUI, EL EXPRESO INCA';
            break;
        case '15':
            buttonDescription.textContent = 'COMERCIO JUSTO';
            break;
        case '16':
            buttonDescription.textContent = 'EL SOROCHE Y EL MATE DE COCA';
            break;
        case '17':
            buttonDescription.textContent = 'CINCO ARGENTINOS PARA CONOCER CON MENOS DE 20 MIL HABITANTES';
            break;
        case '18':
            buttonDescription.textContent = 'TURISMO EN AMERICA LATINA';
            break;
        case '19':
            buttonDescription.textContent = 'EL FUTURO DE LOS IDIOMAS';
            break;
        case '20':
            buttonDescription.textContent = 'CUBA Y VENEZUELA, PARAISOS CARIBEÑOS';
            break;
        default:
            buttonDescription.textContent = ''; // En caso de no encontrar coincidencia, limpiar la descripción
            break;
    }
    
    buttonDescription.style.display = 'block'; // Mostrar la descripción
}

// Event listeners para los botones
for (let i = 1; i <= 20; i++) {
    let button = document.getElementById(`btn${i}`);
    button.addEventListener('click', handleClick);
}

function handleClick(event) {
    clearTimeout(timeoutID); // Limpiar el timeout actual, si existe
    
    // Mostrar la descripción al hacer clic
    reproducirSonidoHover.call(this, event);
    
    const modulo = event.target.dataset.module; // Obtener el número de módulo del botón
    const moduloEnlace = clicado ? parseInt(modulo) + 6 : parseInt(modulo); // Ajustar el número de módulo en función de si la flecha está clicada o no
    timeoutID = setTimeout(function() {
        window.location.href = `./lectura${moduloEnlace}/lectura${moduloEnlace}.html`; // Redirigir al módulo correspondiente después de 10 segundos
    }, 5000); // 10000 milisegundos = 10 segundos
}

var audio = document.getElementById('audioElement');
audio.volume = 0.3;

// Obtener el elemento de descripción
const buttonDescription = document.getElementById('buttonDescription');

// Event listener para ocultar la descripción al salir del botón
document.querySelectorAll('.animated-button').forEach(button => {
    button.addEventListener('mouseleave', () => {
        buttonDescription.style.display = 'none'; // Ocultar la descripción al salir del botón
    });
});
