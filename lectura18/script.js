document.addEventListener('DOMContentLoaded', function () {
    const preguntas = document.querySelectorAll('.relaciona ol li');
    const opciones = document.querySelectorAll('.opciones button');
    const modal = document.getElementById('modal');
    const flecha = document.getElementById('arrow-icon');

    let respuestaArrastrada = null; // Variable para almacenar el botón arrastrado

    // Definir las respuestas correctas
    const respuestasCorrectas = {
        'Está en la lista de las 7 maravillas naturales del mundo. Se encuentra en la frontera entre Argentina y Brasil.': 'Cataratas de Iguazú',
        'Está ubicado en Potosí, Bolivia. Además de ser un lugar turístico, también es un reservorio de sal y litio.': 'Salar de Uyuni',
        'Solo se puede visitar este lugar hasta las 4 de la tarde.': 'Isla Tortuga',
        'Este es uno de los destinos turísticos más populares del mundo.': 'Riviera Maya'
    };

    // Función para iniciar el arrastre
    opciones.forEach(opcion => {
        opcion.addEventListener('dragstart', function (event) {
            event.dataTransfer.setData('text/plain', opcion.getAttribute('data-destino'));
            respuestaArrastrada = opcion;
        });
    });

    // Función para permitir soltar en las zonas designadas
    preguntas.forEach(pregunta => {
        const dropzone = pregunta.querySelector('.dropzone');

        dropzone.addEventListener('dragover', function (event) {
            event.preventDefault();
            dropzone.classList.add('dragover'); // Agregar clase para indicar que está encima
        });

        dropzone.addEventListener('dragleave', function () {
            dropzone.classList.remove('dragover'); // Quitar clase cuando el elemento sale
        });

        dropzone.addEventListener('drop', function (event) {
            event.preventDefault();
            dropzone.classList.remove('dragover'); // Quitar clase al soltar el elemento

            const respuestaCorrecta = respuestasCorrectas[pregunta.querySelector('.pregunta').textContent.trim()];

            if (respuestaArrastrada && respuestaArrastrada.getAttribute('data-destino') === respuestaCorrecta) {
                dropzone.textContent = respuestaArrastrada.textContent;
                dropzone.classList.add('correcto');
                respuestaArrastrada.setAttribute('draggable', 'false'); // Deshabilitar para evitar duplicados
                respuestaArrastrada.classList.add('correcto');
                respuestaArrastrada = null; // Reiniciar variable
            } else {
                dropzone.classList.add('incorrecto');
                respuestaArrastrada.classList.add('incorrecto');
            }

            // Verificar si todas las respuestas son correctas
            if (verificarRespuestasCorrectas()) {
                mostrarModal();
            }
        });
    });

    function verificarRespuestasCorrectas() {
        return Array.from(preguntas).every(pregunta => {
            const descripcion = pregunta.querySelector('.pregunta').textContent.trim();
            const respuestaSeleccionada = pregunta.querySelector('.dropzone').textContent.trim();
            return respuestasCorrectas[descripcion] === respuestaSeleccionada;
        });
    }

    function mostrarModal() {
        modal.style.display = 'block';
        modal.classList.add('show');

        flecha.style.display = 'block';

        flecha.addEventListener('click', function () {
            window.location.href = '../final.html';
        });
    }
});