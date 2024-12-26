const palabras = ["JAVASCRIPT", "CODIGO", "FUNCION", "VARIABLE", "BUCLE"];
 
// Dimensiones de la sopa de letras
const filas = 10;
const columnas = 10;
 
// Generar la matriz inicial
const sopa = Array.from({ length: filas }, () => Array(columnas).fill(""));
 
// Función para colocar palabras en la sopa
function colocarPalabra(palabra) {
    const direccion = Math.random() > 0.5 ? "HORIZONTAL" : "VERTICAL";
    const maxFila = direccion === "HORIZONTAL" ? filas : filas - palabra.length;
    const maxColumna = direccion === "HORIZONTAL" ? columnas - palabra.length : columnas;
 
    let colocada = false;
    while (!colocada) {
        const filaInicio = Math.floor(Math.random() * maxFila);
        const colInicio = Math.floor(Math.random() * maxColumna);
 
        // Verificar si hay espacio
        let espacioDisponible = true;
        for (let i = 0; i < palabra.length; i++) {
            const fila = direccion === "HORIZONTAL" ? filaInicio : filaInicio + i;
            const col = direccion === "HORIZONTAL" ? colInicio + i : colInicio;
            if (sopa[fila][col] !== "") {
                espacioDisponible = false;
                break;
            }
        }
 
        // Colocar palabra si hay espacio
        if (espacioDisponible) {
            for (let i = 0; i < palabra.length; i++) {
                const fila = direccion === "HORIZONTAL" ? filaInicio : filaInicio + i;
                const col = direccion === "HORIZONTAL" ? colInicio + i : colInicio;
                sopa[fila][col] = palabra[i];
            }
            colocada = true;
        }
    }
}
 
// Colocar todas las palabras
palabras.forEach(colocarPalabra);
 
// Rellenar espacios vacíos con letras aleatorias
const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
        if (sopa[i][j] === "") {
            sopa[i][j] = letras[Math.floor(Math.random() * letras.length)];
        }
    }
}
 
// Mostrar la sopa en la página
const tabla = document.getElementById("sopa");
sopa.forEach(fila => {
    const tr = document.createElement("tr");
    fila.forEach(letra => {
        const td = document.createElement("td");
        td.textContent = letra;
        tr.appendChild(td);
    });
    tabla.appendChild(tr);
});

// Variable para almacenar las palabras encontradas
const palabrasEncontradas = [];
 
// Crear un mapa para rastrear las posiciones de cada palabra
const mapaPalabras = {};
 
// Rellenar el mapa de palabras
function registrarPalabra(palabra) {
    const direccion = Math.random() > 0.5 ? "HORIZONTAL" : "VERTICAL";
    const maxFila = direccion === "HORIZONTAL" ? filas : filas - palabra.length;
    const maxColumna = direccion === "HORIZONTAL" ? columnas - palabra.length : columnas;
 
    let colocada = false;
    while (!colocada) {
        const filaInicio = Math.floor(Math.random() * maxFila);
        const colInicio = Math.floor(Math.random() * maxColumna);
 
        let espacioDisponible = true;
        const posiciones = [];
        for (let i = 0; i < palabra.length; i++) {
            const fila = direccion === "HORIZONTAL" ? filaInicio : filaInicio + i;
            const col = direccion === "HORIZONTAL" ? colInicio + i : colInicio;
            if (sopa[fila][col] !== "") {
                espacioDisponible = false;
                break;
            }
            posiciones.push([fila, col]);
        }
 
        if (espacioDisponible) {
            for (let i = 0; i < palabra.length; i++) {
                const [fila, col] = posiciones[i];
                sopa[fila][col] = palabra[i];
            }
            mapaPalabras[palabra] = posiciones; // Guardar posiciones de la palabra
            colocada = true;
        }
    }
}
 
// Colocar todas las palabras con el registro
palabras.forEach(registrarPalabra);
 
// Función para marcar una palabra como encontrada
function marcarPalabraComoEncontrada(palabra) {
    if (!palabrasEncontradas.includes(palabra)) {
        palabrasEncontradas.push(palabra);
 
        // Mostrar la palabra en la lista
        const lista = document.getElementById("palabras-encontradas");
        const li = document.createElement("li");
        li.textContent = palabra;
        lista.appendChild(li);
 
        // Marcar las celdas de la palabra
        mapaPalabras[palabra].forEach(([fila, col]) => {
            const celda = tabla.rows[fila].cells[col];
celda.style.backgroundColor = "lightgreen";
        });
    }
}
 
// Detectar clic en las celdas
let seleccionActual = "";
let seleccionPosiciones = [];
tabla.addEventListener("click", (evento) => {
const celda = evento.target;
    if (celda.tagName !== "TD") return;
 
    const fila = celda.parentElement.rowIndex;
    const col = celda.cellIndex;
 
    seleccionActual += sopa[fila][col];
    seleccionPosiciones.push([fila, col]);
 
celda.style.backgroundColor = "yellow";
 
    // Verificar si la selección forma una palabra válida
    if (palabras.includes(seleccionActual)) {
        marcarPalabraComoEncontrada(seleccionActual);
        seleccionActual = ""; // Reiniciar la selección
        seleccionPosiciones = [];
    }
});