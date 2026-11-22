const ciudad = ["Medellín", "Bogotá", "Cali", "Pereira"];

const producto = [
    {nombre: "Origen Nariño 250 g", precio: 26000},
    {nombre: "Origen Huila 500 g", precio: 42000},
    {nombre: "Origen Sierra 500 g", precio: 45000},
    {nombre: "Prensa francesa", precio: 95000},
    {nombre: "Molino manual", precio: 120000}, 
];

const fecha = ["2026-09-01", "2026-09-02", "2026-09-03", "2026-09-04", "2026-09-05", "2026-09-06"];

function aleatorioEntero(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function generarVentas(numero) {
    const ventasGeneradas = []
    const maxClientes = Math.floor(Math.max(1, numero/3))
    for (let i = 0; i < numero; i++) {
        const elegido = producto[aleatorioEntero(0, producto.length - 1)]
        ventasGeneradas.push({
            id: i + 1,
            fecha: fecha[aleatorioEntero(0, fecha.length - 1)],
            cliente: (`C${String(aleatorioEntero(1, maxClientes)).padStart(2, "0")}`),
            producto: elegido.nombre,
            ciudad: ciudad[aleatorioEntero(0, ciudad.length - 1)],
            cantidad: aleatorioEntero(1, 5),
            precio: elegido.precio
        })
    }
    return ventasGeneradas
}

module.exports = {generarVentas};