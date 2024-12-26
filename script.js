/ Palabras a incluir en la sopa

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