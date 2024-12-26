const palabras = ['SILENTIUM', 'CONECTANDO', 'WAVINAS', 'FUSION'];
const tamaño = 20; // Tamaño de la sopa
const sopa = Array.from(Array(tamaño), () => Array(tamaño).fill(''));

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

// Mostrar la sopa de letras en la tabla y permitir selección
const tabla = document.getElementById('sopa');
sopa.forEach((fila, filaIndex) => {
    const filaElemento = document.createElement('tr');
    fila.forEach((letra, colIndex) => {
        const celda = document.createElement('td');
        celda.textContent = letra;
        celda.addEventListener('click', () => {
            celda.classList.toggle('selected');
            // Aquí podrías agregar lógica adicional para verificar si se seleccionó una palabra completa.
        });
        filaElemento.appendChild(celda);
    });
    tabla.appendChild(filaElemento);
});