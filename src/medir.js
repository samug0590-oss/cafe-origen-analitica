const {totalVendidoI, ventaMayorI,totalPorCiudadI, primerVentaI} = require('./analitica');
const {generarVentas} = require('./generador')

const tamanos = [100, 1000, 10000, 100000];

function totalOperaciones(tamanos) {
    const operaciones = []
    for (const tamano of tamanos) {
        const ventasActuales = generarVentas(tamano)
        const contador1 = {operaciones: 0}
        const contador2 = {operaciones: 0}
        const contador3 = {operaciones: 0}
        const contador4 = {operaciones: 0}
        totalVendidoI(ventasActuales, contador1)
        ventaMayorI(ventasActuales, contador2)
        totalPorCiudadI(ventasActuales, contador3)
        primerVentaI(ventasActuales, contador4)
        operaciones.push({
            n: tamano,
            totalVendidoI: contador1.operaciones,
            ventaMayorI: contador2.operaciones,
            totalPorCiudadI: contador3.operaciones,
            primerVentaI: contador4.operaciones,
        })
    }
    return operaciones
}

console.table(totalOperaciones(tamanos))