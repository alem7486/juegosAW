const words = ["FUSION", "CONECTANDO", "HEP2O", "WAVINAS"]; 
const gridSize = 10; 
let wordGrid;
let currentSelection = []; 
let wordsFound = []; 

document.addEventListener('DOMContentLoaded', () => {
    startNewGame();
    document.getElementById('generateNew').addEventListener('click', startNewGame);
});

function startNewGame() {
    wordGrid = generateEmptyGrid(gridSize);
    currentSelection = []; 
    wordsFound = [];
    placeWordsInGrid(words, wordGrid);
    renderGrid(wordGrid);
    renderWordsList(words); 
}

function generateEmptyGrid(size) {
    return Array(size).fill(null).map(() => Array(size).fill('_'));
}

function placeWordsInGrid(words, grid) {
    const directions = [
        { row: 0, col: 1 },  // Horizontal
        { row: 1, col: 0 },  // Vertical
        { row: 1, col: 1 },  // Diagonal \
        { row: 1, col: -1 }  // Diagonal /
    ];

    words.forEach(word => {
        let placed = false;
        while (!placed) {
            const direction = directions[Math.floor(Math.random() * directions.length)];
            const row = Math.floor(Math.random() * gridSize);
            const col = Math.floor(Math.random() * gridSize);
            if (canPlaceWordAt(word, grid, row, col, direction)) {
                for (let i = 0; i < word.length; i++) {
                    grid[row + i * direction.row][col + i * direction.col] = word[i];
                }
                placed = true;
            }
        }
    });
}

function canPlaceWordAt(word, grid, row, col, direction) {
    for (let i = 0; i < word.length; i++) {
        const newRow = row + i * direction.row;
        const newCol = col + i * direction.col;
        if (newRow < 0 || newRow >= gridSize || newCol < 0 || newCol >= gridSize || grid[newRow][newCol] !== '_') {
            return false;
        }
    }
    return true;
}

function renderGrid(grid) {
    const container = document.getElementById('wordSearchContainer');
    container.innerHTML = '';
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement('div');
            cellElement.textContent = cell === '_' ? String.fromCharCode(65 + Math.floor(Math.random() * 26)) : cell;
            cellElement.dataset.index = rowIndex * gridSize + colIndex;
            cellElement.addEventListener('click', () => selectCell(rowIndex, colIndex, cellElement));
            container.appendChild(cellElement);
        });
    });
}

function renderWordsList(words) {
    const wordsListContainer = document.getElementById('wordsList');
    wordsListContainer.innerHTML = '';
    words.forEach(word => {
        const wordElement = document.createElement('div');
        wordElement.textContent = word;
        wordElement.setAttribute('data-word', word);
        wordsListContainer.appendChild(wordElement);
    });
}

function selectCell(rowIndex, colIndex, cellElement) {
    const index = rowIndex * gridSize + colIndex;
    if (currentSelection.includes(index)) return;
    cellElement.classList.add('selected');
    currentSelection.push(index);

    const selectedWord = currentSelection.map(idx => {
        const row = Math.floor(idx / gridSize);
        const col = idx % gridSize;
        return wordGrid[row][col];
    }).join('');

    if (words.includes(selectedWord) && !wordsFound.includes(selectedWord)) {
        wordsFound.push(selectedWord);
        alert(`¡Has encontrado la palabra "${selectedWord}"!`);
        currentSelection.forEach(idx => {
            document.querySelector(`[data-index="${idx}"]`).classList.add('found');
        });

        document.querySelector(`[data-word="${selectedWord}"]`).classList.add('found');
        currentSelection = [];

        if (wordsFound.length === words.length) {
            setTimeout(() => {
                alert('¡Has ganado!');
                startNewGame();
            }, 1000);
        }
    } else if (!words.some(word => word.startsWith(selectedWord))) {
        currentSelection.forEach(idx => {
            document.querySelector(`[data-index="${idx}"]`).classList.remove('selected');
        });
        currentSelection = [];
    }
}