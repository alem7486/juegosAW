const palabras = ['JAVA', 'SCRIPT', 'HTML', 'CSS'];
const tamaño = 10; // Tamaño de la sopa
const sopa = Array.from(Array(tamaño), () => Array(tamaño).fill(''));

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

palabras.forEach(colocarPalabra);

// Completar la sopa con letras aleatorias
for (let i = 0; i < tamaño; i++) {
    for (let j = 0; j < tamaño; j++) {
        if (sopa[i][j] === '') {
            sopa[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Letras de A a Z
        }
    }
}

// Mostrar la sopa de letras en la tabla
const tabla = document.getElementById('sopa');
sopa.forEach(fila => {
    const filaElemento = document.createElement('tr');
    fila.forEach(letra => {
        const celda = document.createElement('td');
        celda.textContent = letra;
        filaElemento.appendChild(celda);
    });
    tabla.appendChild(filaElemento);
});

