const palabras = ['SILENTIUM', 'CONECTANDO', 'WAVINAS', 'FUSION'];
const tamaño = 20; // Tamaño de la sopa
const sopa = Array.from(Array(tamaño), () => Array(tamaño).fill(''));
const palabrasEncontradas = [];

// Función para colocar las palabras
function colocarPalabra(palabra) {
    const direccion = Math.random() < 0.5 ? 'horizontal' : 'vertical';
    if (direccion === 'horizontal') {
        const fila = Math.floor(Math.random() * tamaño);
        const colInicio = Math.floor(Math.random() * (tamaño - palabra.length));
        
        for (let i = 0; i < palabra.length; i++) {
            sopa[fila][colInicio + i] = palabra[i];
        }
    } else {
        const col = Math.floor(Math.random() * tamaño);
        const filaInicio = Math.floor(Math.random() * (tamaño - palabra.length));
        
        for (let i = 0; i < palabra.length; i++) {
            sopa[filaInicio + i][col] = palabra[i];
        }
    }
}

// Colocamos cada palabra en la sopa
palabras.forEach(colocarPalabra);

// Completar la sopa con letras aleatorias
for (let i = 0; i < tamaño; i++) {
    for (let j = 0; j < tamaño; j++) {
        if (sopa[i][j] === '') {
            sopa[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Letras de A a Z
        }
    }
}

// Función para verificar si una palabra está seleccionada
function verificarPalabra() {
    let seleccionada = '';
    document.querySelectorAll('td.selected').forEach(celda => {
        seleccionada += celda.textContent;
    });

    if (palabras.includes(seleccionada)) {
        document.querySelectorAll('td.selected').forEach(celda => {
            celda.classList.remove('selected');
            celda.classList.add('correct');
        });
        if (!palabrasEncontradas.includes(seleccionada)) {
            palabrasEncontradas.push(seleccionada);
            document.getElementById('encontradas').textContent = palabrasEncontradas.join(', ');
        }
    }
}

// Mostrar la sopa de letras en la tabla y permitir selección
const tabla = document.getElementById('sopa');
sopa.forEach((fila, filaIndex) => {
    const filaElemento = document.createElement('tr');
    fila.forEach((letra, colIndex) => {
        const celda = document.createElement('td');
        celda.textContent = letra;
        celda.addEventListener('click', () => {
            celda.classList.toggle('selected');
            verificarPalabra();
        });
        filaElemento.appendChild(celda);
    });
    tabla.appendChild(filaElemento);
});

// Crear un div para mostrar las palabras encontradas
const encontradasDiv = document.createElement('div');
encontradasDiv.id = 'encontradas';
encontradasDiv.style.marginTop = '20px';
document.body.appendChild(encontradasDiv);
