const {clientesRecurrentes, unidadesVendidas, ticketPromedio, ventasPorCiudad, unidadesPorProducto, topProductosPorValor, ventasDelDia, totalCiudadCadena, totalCiudadUnaPasada, valorVenta, clientesRecurrentesSet, clientesRecurrentesMap, comprasPorCliente} = require('./analitica');
const {generarVentas} = require('./generador')

const tamanos = [1000, 10000, 100000]

function algo(tamanos) {
    for (tamanos of tamanos) {
        const ventas = generarVentas(tamanos)
        console.time("mi-medicion")
        clientesRecurrentes(ventas)
        console.timeEnd("mi-medicion")
    }
}

//algo(tamanos)

function algo1(tamanos) {
    for (tamanos of tamanos) {
        const ventas = generarVentas(tamanos)
        console.time("set")
        clientesRecurrentesSet(ventas)
        console.timeEnd("set")

        console.time("Map")
        clientesRecurrentesMap(comprasPorCliente(ventas))
        console.timeEnd("Map")
    }
}

algo1(tamanos)

function medirTiempoTodas(tamanos) {
    for (tamanos of tamanos) {
        const ventas = generarVentas(tamanos)
        console.time("unidadesVendidas")
        unidadesVendidas(ventas)
        console.timeEnd("unidadesVendidas")

        console.time("ticketPromedio")
        ticketPromedio(ventas)
        console.timeEnd("ticketPromedio")

        console.time("ventasPorCiudad")
        ventasPorCiudad(ventas, "medellín")
        console.timeEnd("ventasPorCiudad")

        console.time("unidadesPorProducto")
        unidadesPorProducto(ventas)
        console.timeEnd("unidadesPorProducto")

        console.time("topProductosPorValor")
        topProductosPorValor(ventas, 3)
        console.timeEnd("topProductosPorValor")

        console.time("ventasDelDia")
        ventasDelDia(ventas, "2026-09-05")
        console.timeEnd("ventasDelDia")

        console.time("totalCiudadCadena")
        totalCiudadCadena(ventas, "medellín")
        console.timeEnd("totalCiudadCadena")

        console.time("totalCiudadUnaPasada")
        totalCiudadUnaPasada(ventas, "medellín")
        console.timeEnd("totalCiudadUnaPasada")

        console.time("valorVenta")
        valorVenta(ventas[1])
        console.timeEnd("valorVenta")
    }
}

//medirTiempoTodas(tamanos)