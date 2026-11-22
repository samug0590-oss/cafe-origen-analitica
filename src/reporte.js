const ventas = require('./datos')
const {valorVenta, totalVendido, unidadesVendidas, ventaMayor, ticketPromedio, ventasPorCiudad, totalVendidoM, unidadesVendidasM, ventasPorCiudadM, totalPorCiudad, unidadesPorProducto, topProductosPorValor, ventasDelDia} = require('./analitica');

function pesos(valor) {
  if (valor === null) return "sin datos";
  return `$${valor.toLocaleString("es-CO")}`;
}

function titulo(texto) {
  console.log("");
  console.log("=".repeat(40));
  console.log(texto.toUpperCase());
  console.log("=".repeat(40));
  console.log("")
}

function mayuscula(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1)
}

function subtitulo(texto) {
    console.log("-".repeat(40));
    console.log(texto.toUpperCase())
    console.log("-".repeat(40));
}

const total = totalVendido(ventas)
const ticket = ticketPromedio(ventas)

const mayor = ventaMayor(ventas);
function mayorVenta(mayor) {
    if (mayor !== null) {
    console.log(`${"Venta mayor".padEnd(22)} ${pesos(valorVenta(mayor)).padStart(12)}`);
    console.log(`(${(mayor.producto)}, ${(mayor.ciudad)})`);
    }
}

const ciudades = totalPorCiudad(ventas)
function totalCiudad(ciudades) {
    for (const [ciudad, total] of Object.entries(ciudades)) {
        console.log(`${mayuscula(ciudad).padEnd(22)} ${pesos(total).padStart(12)}`);
    }
}

const unidades = unidadesPorProducto(ventas)
function unidadesTotalesPorProducto(unidades) {
    for (const [producto, cantidad] of Object.entries(unidades)) {
        console.log(`${mayuscula(producto).padEnd(22)} ${String(cantidad).padStart(12)}`)
    }
}

const topProductos = topProductosPorValor(ventas, 3)
function topProductosValor(topProductos) {
    for (const [producto, valor] of topProductos) {
        console.log(`${mayuscula(producto).padEnd(22)} ${pesos(valor).padStart(12)}`)
    }
}

function resumenDia(ventas, fecha) {
    const delDia = ventasDelDia(ventas, fecha)
    subtitulo(`"resumen del dia: " ${fecha}`)
    if (delDia.length === 0) {
        console.log(`${"Sin ventas este día".padEnd(22)}`)
    }
    console.log(`${"Total vendido".padEnd(22)} ${pesos(totalVendido(delDia)).padStart(12)}`)
    console.log(`${"Unidades vendidas".padEnd(22)} ${String(unidadesVendidas(delDia)).padStart(12)}`)
    console.log(`${"Ticket promedio".padEnd(22)} ${pesos(ticketPromedio(delDia)).padStart(12)}`)
    console.log("")
}

titulo("café origen - reporte de ventas v0.1")
subtitulo("resumen general")
console.log(`${"Total vendido".padEnd(22)} ${pesos(total).padStart(12)}`);
console.log(`${"Unidades vendidas".padEnd(22)} ${String(unidadesVendidas(ventas)).padStart(12)}`);
console.log(`${"Ticket promedio".padEnd(22)} ${pesos(ticket).padStart(12)}`);
mayorVenta(mayor)
console.log("")
subtitulo("ventas por ciudad")
totalCiudad(ciudades)
console.log("")
subtitulo("unidades por producto")
unidadesTotalesPorProducto(unidades)
console.log("")
subtitulo("top 3 productos por valor")
topProductosValor(topProductos)
console.log("")
resumenDia(ventas, "2026-09-01")
resumenDia(ventas, "2026-09-30")