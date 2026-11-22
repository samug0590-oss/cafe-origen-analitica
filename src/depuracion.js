const {valorVenta, totalVendido, unidadesVendidas, ventaMayor, ticketPromedio, ventasPorCiudad, totalVendidoM, unidadesVendidasM, ventasPorCiudadM, totalPorCiudad, unidadesPorProducto, topProductosPorValor, ventasDelDia, compFunciones} = require('./analitica');

const ventas = [
  { id: 1, fecha: "2026-09-01", cliente: "C01", producto: "Origen Huila 500 g", ciudad: "Bogotá ", cantidad: 2, precio: 42000 },
  { id: 2, fecha: "2026-09-01", cliente: "C02", producto: "Origen Nariño 250 g", ciudad: "Bogotá", cantidad: 1, precio: 26000 },
  { id: 3, fecha: "2026-09-02", cliente: "C03", producto: "Prensa francesa", ciudad: "bogotá", cantidad: 1, precio: 95000 }
];

function totalPorCiudadMala(ventas) {
    let porCiudad = {}
    for (const venta of ventas) {
        let clave = venta.ciudad
        if (porCiudad[clave] === undefined) {
            porCiudad[clave] = 0;
        }
        porCiudad[clave] = porCiudad[clave] + valorVenta(venta)
    }
    return porCiudad
}

console.log(totalPorCiudadMala(ventas))
console.log(totalPorCiudad(ventas))
console.log(compFunciones(totalPorCiudad(ventas), totalPorCiudadMala(ventas)))

function ticketPromedioMala(ventas) {
    let cantidadValidas = 0;
    let total = 0;
    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            cantidadValidas++;
            total = total + valorVenta(venta)
        }
    }
    return total / cantidadValidas;
}

console.log(ticketPromedioMala([]))
console.log(ticketPromedio([]))
console.log("DIFERENTE")