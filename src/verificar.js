const ventas = require('./datos')
const {valorVenta, totalVendido, unidadesVendidas, ventaMayor, ticketPromedio, ventasPorCiudad, totalVendidoM, unidadesVendidasM, ventasPorCiudadM, compFunciones, totalPorCiudad, unidadesPorProducto, topProductosPorValor, totalCiudadUnaPasada, totalCiudadCadena} = require('./analitica');
const {generarVentas} = require('./generador')

/*//totalVendido
console.log(totalVendido(ventas))
console.log(totalVendidoM(ventas))
console.log(compFunciones(totalVendido(ventas), totalVendidoM(ventas)))

//unidadesVendidas
console.log(unidadesVendidas(ventas))
console.log(unidadesVendidasM(ventas))
console.log(compFunciones(unidadesVendidas(ventas), unidadesVendidasM(ventas)))

//ventasPorCiudad
console.log(ventasPorCiudad(ventas, "medellín"))
console.log(ventasPorCiudadM(ventas, "medellín"))
console.log(compFunciones(ventasPorCiudad(ventas, "medellín"), ventasPorCiudadM(ventas, "medellín")))

//totalPorCiudad
console.log(totalPorCiudad(ventas))

//unidadesPorProducto
console.log(unidadesPorProducto(ventas))

//topProductosPorValor
console.log(topProductosPorValor(ventas, 3))*/

//totalCiudadCadena - totalCiudadUnaPasada
const ventasNuevas = generarVentas(10000)
console.log(totalCiudadCadena(ventasNuevas, "medellín"))
console.log(totalCiudadUnaPasada(ventasNuevas, "medellín"))
console.log(compFunciones(totalCiudadCadena(ventasNuevas, "medellín"), totalCiudadUnaPasada(ventasNuevas, "medellín")))