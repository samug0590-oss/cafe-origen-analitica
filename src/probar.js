const ventas = require('./datos')
const {valorVenta, totalVendido, unidadesVendidas, ventaMayor, ticketPromedio, ventasPorCiudad, ventasDelDia} = require('./analitica');

//valorVenta
console.log(valorVenta(ventas))
console.log(valorVenta(ventas[0]))
console.log(valorVenta(ventas[7]))

// //totalVendido
console.log(totalVendido(ventas))
console.log(totalVendido([ventas[1]]))
console.log(totalVendido([]))

// //unidadesVendidas
console.log(unidadesVendidas(ventas))
console.log(unidadesVendidas([ventas[3]]))
console.log(unidadesVendidas([]))

//ventaMayor
console.log(ventaMayor(ventas))
console.log(ventaMayor([ventas[11]]))
console.log(ventaMayor([]))

//ticketPromedio
console.log(ticketPromedio(ventas))
console.log(ticketPromedio([ventas[5]]))
console.log(ticketPromedio([]))

// //ventasPorCiudad
console.log(ventasPorCiudad(ventas, "medellín"))
console.log(ventasPorCiudad([ventas[6]], "bogotá"))
console.log(ventasPorCiudad([], "medellín"))