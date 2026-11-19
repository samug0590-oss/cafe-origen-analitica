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

module.exports = {valorVenta, totalVendido, unidadesVendidas, ventaMayor, ticketPromedio, ventasPorCiudad};