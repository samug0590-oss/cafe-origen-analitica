const ventas = require("./datos");

function valorVenta(venta) {
    return venta.cantidad * venta.precio;
}

function totalVendido(ventas) {
    let total = 0;
    for (const venta of ventas) {
        total = total + valorVenta(venta)
    }
    return total
}

function unidadesVendidas(ventas){
    let unidadesTotal = 0;
    for (const venta of ventas) {
        unidadesTotal = unidadesTotal + venta.cantidad
    }
    return unidadesTotal
}


function ventaMayor(ventas) {
    let mayor = null;
    for (const venta of ventas) {
        if (mayor === null || valorVenta(venta) > valorVenta(mayor)) {
            mayor = venta;
        }
    }
    return mayor
}

function ticketPromedio(ventas) {
    let cantidadValidas = 0;
    let total = 0;
    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            cantidadValidas++;
            total = total + valorVenta(venta)
        }
    }
    if (cantidadValidas === 0) {
        return (null);
    }
    return total / cantidadValidas;
}

function ventasPorCiudad(ventas, ciudad) {
    let suma = 0;
    const ciudadBuscada = ciudad.trim().toLowerCase()
    for (const venta of ventas) {
        const ciudadVenta = venta.ciudad.trim().toLowerCase();
        if (ciudadBuscada === ciudadVenta) {
            suma = suma + valorVenta(venta)
        }
    }
    return suma
}

function totalVendidoM(ventas) {
    return ventas.reduce((totalActual, venta) => totalActual + valorVenta(venta),0)
}

function unidadesVendidasM(ventas) {
    return ventas.reduce((totalActual, venta) => totalActual + venta.cantidad,0)
}

function ventasPorCiudadM(ventas, ciudad) {
    const ciudadBuscada = ciudad.trim().toLowerCase()
    return ventas.filter(venta => venta.ciudad.trim().toLowerCase() === ciudadBuscada).reduce((suma, venta) => suma + valorVenta(venta), 0);
}

function compFunciones(funcion1, funcion2) {
    if (funcion1 === funcion2) {
        return "OK"
    } else {
        return "DIFERENTE"
    }
}

function totalPorCiudad(ventas) {
    let porCiudad = {}
    for (const venta of ventas) {
        let clave = venta.ciudad.trim().toLowerCase()
        if (porCiudad[clave] === undefined) {
            porCiudad[clave] = 0;
        }
        porCiudad[clave] = porCiudad[clave] + valorVenta(venta)
    }
    return porCiudad
}

function unidadesPorProducto(ventas) {
    let porProducto = {}
    for (const venta of ventas) {
        let clave = venta.producto.trim().toLowerCase()
        if (porProducto[clave] === undefined) {
            porProducto[clave] = 0;
        }
        porProducto[clave] = porProducto[clave] + venta.cantidad
    }
    return porProducto
}

function topProductosPorValor(ventas, k) {
    
}

module.exports = {valorVenta, totalVendido, unidadesVendidas, ventaMayor, ticketPromedio, ventasPorCiudad, totalVendidoM, unidadesVendidasM, ventasPorCiudadM, compFunciones, totalPorCiudad, unidadesPorProducto};