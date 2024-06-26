document.addEventListener('DOMContentLoaded', function () {
    let sopaCompleta = false;
    const modalNext = document.getElementById('modal');
    const flecha = document.querySelector('#arrow-icon');
    const words = ["FAMILIA", "TIOS", "ABUELOS", "PRIMOS", "PARIENTES", "HERMANOS"];
    const gridSize = 13;
    let grid = Array.from(Array(gridSize), () => new Array(gridSize).fill(''));

    // Coloca las palabras en la cuadrícula
    words.forEach(word => {
        let placed = false;
        while (!placed) {
            let direction = Math.floor(Math.random() * 2); // 0: horizontal, 1: vertical
            let row = Math.floor(Math.random() * gridSize);
            let col = Math.floor(Math.random() * gridSize);
            if (canPlaceWord(word, row, col, direction)) {
                placeWord(word, row, col, direction);
                placed = true;
            }
        }
    });

    // Rellena los espacios vacíos con letras aleatorias
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (grid[row][col] === '') {
                grid[row][col] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            }
        }
    }

    // Mostrar la cuadrícula y la lista de palabras
    const wordSearchContainer = document.getElementById('wordSearchContainer');
    const wordList = document.getElementById('wordList');

    grid.forEach((row, rowIndex) => {
        row.forEach((letter, colIndex) => {
            const cell = document.createElement('div');
            cell.textContent = letter;
            cell.dataset.row = rowIndex;
            cell.dataset.col = colIndex;
            wordSearchContainer.appendChild(cell);
        });
    });

    words.forEach(word => {
        const listItem = document.createElement('li');
        listItem.textContent = word;
        wordList.appendChild(listItem);
    });

    let isMouseDown = false;
    let startCell = null;
    let selectedCells = [];

    function handleStart(cell) {
        if (cell && cell.nodeName === "DIV") {
            isMouseDown = true;
            startCell = cell;
            selectedCells = [startCell];
            startCell.classList.add('selected');
        }
    }

    function handleMove(cell) {
        if (isMouseDown && cell && cell.nodeName === "DIV") {
            selectedCells.forEach(cell => cell.classList.remove('selected'));
            selectedCells = getCellsInRange(startCell, cell);
            selectedCells.forEach(cell => cell.classList.add('selected'));
        }
    }

    function handleEnd() {
        isMouseDown = false;
        checkSelectedWord();
        selectedCells.forEach(cell => cell.classList.remove('selected'));
        selectedCells = [];
    }

    wordSearchContainer.addEventListener('mousedown', (e) => handleStart(e.target));
    wordSearchContainer.addEventListener('mouseover', (e) => handleMove(e.target));
    wordSearchContainer.addEventListener('mouseup', handleEnd);

    wordSearchContainer.addEventListener('touchstart', (e) => handleStart(e.targetTouches[0].target));
    wordSearchContainer.addEventListener('touchmove', (e) => {
        e.preventDefault();
        handleMove(document.elementFromPoint(e.targetTouches[0].clientX, e.targetTouches[0].clientY));
    });
    wordSearchContainer.addEventListener('touchend', handleEnd);

    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchend', handleEnd);

    function canPlaceWord(word, row, col, direction) {
        if (direction === 0) { // horizontal
            if (col + word.length > gridSize) return false;
            for (let i = 0; i < word.length; i++) {
                if (grid[row][col + i] !== '' && grid[row][col + i] !== word[i]) return false;
            }
        } else { // vertical
            if (row + word.length > gridSize) return false;
            for (let i = 0; i < word.length; i++) {
                if (grid[row + i][col] !== '' && grid[row + i][col] !== word[i]) return false;
            }
        }
        return true;
    }

    function placeWord(word, row, col, direction) {
        for (let i = 0; i < word.length; i++) {
            if (direction === 0) { // horizontal
                grid[row][col + i] = word[i];
            } else { // vertical
                grid[row + i][col] = word[i];
            }
        }
    }

    function getCellsInRange(start, end) {
        const cells = [];
        const startRow = parseInt(start.dataset.row);
        const startCol = parseInt(start.dataset.col);
        const endRow = parseInt(end.dataset.row);
        const endCol = parseInt(end.dataset.col);

        if (startRow === endRow) {
            const minCol = Math.min(startCol, endCol);
            const maxCol = Math.max(startCol, endCol);
            for (let col = minCol; col <= maxCol; col++) {
                cells.push(wordSearchContainer.querySelector(`[data-row="${startRow}"][data-col="${col}"]`));
            }
        } else if (startCol === endCol) {
            const minRow = Math.min(startRow, endRow);
            const maxRow = Math.max(startRow, endRow);
            for (let row = minRow; row <= maxRow; row++) {
                cells.push(wordSearchContainer.querySelector(`[data-row="${row}"][data-col="${startCol}"]`));
            }
        }
        return cells;
    }

    function checkSelectedWord() {
        const selectedWord = selectedCells.map(cell => cell.textContent).join('');
        const reversedWord = selectedCells.map(cell => cell.textContent).reverse().join('');

        if (words.includes(selectedWord) || words.includes(reversedWord)) {
            selectedCells.forEach(cell => {
                cell.classList.add('correct');
                cell.classList.remove('selected');
            });
            const wordItem = Array.from(wordList.children).find(item => item.textContent === selectedWord || item.textContent === reversedWord);
            if (wordItem) wordItem.classList.add('found');
            // Comprobar si todas las palabras han sido encontradas
            if (Array.from(wordList.children).every(item => item.classList.contains('found'))) {
                sopaCompleta = true;
                mostrarModalYSalida();
            }
        } else {
            selectedCells.forEach(cell => cell.classList.remove('selected'));
        }
    }

    function mostrarModalYSalida() {
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
});

