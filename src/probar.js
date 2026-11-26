const ventas = require('./datos')
const {valorVenta, totalVendido, unidadesVendidas, ventaMayor, ticketPromedio, ventasPorCiudad, ventasDelDia, comboRegaloFuerzaBruta, comboRegalo, productoEstrellaPorCiudad, primerClienteUnico } = require('./analitica');
const catalogo = require("./catalogo");

function nombres(pareja) {
    return pareja === null ? null : pareja.map(p => p.nombre);
}

for (const valor of [87000, 61000, 10000, 100000, 84000, 0]) {
    console.log(valor, "fuerza bruta:", nombres(comboRegaloFuerzaBruta(catalogo, valor)));
    console.log(valor, "optimizada: ", nombres(comboRegalo(catalogo, valor)));
}

console.log("catalogo vacio:", comboRegalo([], 87000));
console.log("un producto:", comboRegalo([catalogo[0]], 52000));

console.log(productoEstrellaPorCiudad(ventas));
console.log(productoEstrellaPorCiudad([]));

console.log(primerClienteUnico(ventas));
console.log(primerClienteUnico([]));

/*
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
console.log(ventasPorCiudad([], "medellín"))*/