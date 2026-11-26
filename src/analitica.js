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
    let porProducto = {}
    for (const venta of ventas) {
        let clave = venta.producto.trim().toLowerCase()
        if (porProducto[clave] === undefined) {
            porProducto[clave] = 0;
        }
        porProducto[clave] = porProducto[clave] + valorVenta(venta)
    }
    const entradasPorProducto = Object.entries(porProducto)
    entradasPorProducto.sort((a, b) => b[1] - a[1])
    return entradasPorProducto.slice(0, k)
}

function ventasDelDia(ventas, fecha) {
    let delDia = []
    for (const venta of ventas) {
        if (venta.fecha.trim() === fecha.trim()) {
            delDia.push(venta)
        }
    }
    return delDia
}

function totalVendidoI(ventas, contador) {
    let total = 0;
    for (const venta of ventas) {
        total = total + valorVenta(venta)
        contador.operaciones = contador.operaciones + 1
    }
    return total
}

function ventaMayorI(ventas, contador) {
    let mayor = null;
    for (const venta of ventas) {
        //visita
        contador.operaciones = contador.operaciones + 1
        //comparacion
        contador.operaciones = contador.operaciones + 1
        if (mayor === null || valorVenta(venta) > valorVenta(mayor)) {
            mayor = venta;
        }
    }
    return mayor
}

function totalPorCiudadI(ventas, contador) {
    let porCiudad = {}
    for (const venta of ventas) {
        //visita
        contador.operaciones = contador.operaciones + 1
        let clave = venta.ciudad.trim().toLowerCase()
        //comparacion
        contador.operaciones = contador.operaciones + 1
        if (porCiudad[clave] === undefined) {
            porCiudad[clave] = 0;
        }
        porCiudad[clave] = porCiudad[clave] + valorVenta(venta)
    }
    return porCiudad
}

function primerVentaI(ventas, contador) {
    contador.operaciones = contador.operaciones + 1
    if (ventas.length === 0) {
        return null
    }
    return ventas[0]
}

function clientesRecurrentes(ventas) {
    const recurrentes = [];
    for (let i = 0; i < ventas.length; i++) {
        for (let j = i + 1; j < ventas.length; j++) {
            if (ventas[i].cliente === ventas[j].cliente && !recurrentes.includes(ventas[i].cliente)) {
                recurrentes.push(ventas[i].cliente);
            }
        }
    }
    if (recurrentes.length === 0) {
        return null, "No hay clientes recurrentes"
    }
    return recurrentes;
}

function totalCiudadCadena(ventas, ciudad) {
    const ciudadBuscada = ciudad.trim().toLowerCase()

    return ventas
    .map((venta) => ({
      ...venta,
      ciudad: venta.ciudad.trim().toLowerCase(),
    }))
    .filter((venta) => venta.ciudad.trim().toLowerCase() === ciudadBuscada)
    .map((venta) => valorVenta(venta))
    .reduce((suma, total) => suma + total, 0);
}

function totalCiudadUnaPasada(ventas, ciudad) {
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

function clientesRecurrentesSet(ventas) {
    const vistos = new Set();
    const recurrentes = new Set();
    for (const venta of ventas) {
        if (vistos.has(venta.cliente)) {
            recurrentes.add(venta.cliente)
        } else {
            vistos.add(venta.cliente)
        }
    }
    return [...recurrentes]
}

function comprasPorCliente(ventas) {
    const conteoCliente = new Map();
    for (const venta of ventas) {
        if (conteoCliente.has(venta.cliente)) {
            const cuentaAnterior = conteoCliente.get(venta.cliente)
            conteoCliente.set(venta.cliente, cuentaAnterior + 1)
        } else {
            conteoCliente.set(venta.cliente, 1)
        }
    }
    return conteoCliente
}

function clientesRecurrentesMap(conteoCliente) {
    const recurrentes = [];
    for (const [cliente, cantidad] of conteoCliente) {
        if (cantidad > 1) {
           recurrentes.push(cliente)
        }
    }
    return recurrentes
}

function comboRegaloFuerzaBruta(catalogo, valor) {
    for (let i = 0; i < catalogo.length; i++) {
        for (let j = i + 1; j < catalogo.length; j++) {
            if (catalogo[i].precio + catalogo[j].precio === valor) {
                return [catalogo[i], catalogo[j]];
            }
        }
    }
    return null;
}

function comboRegalo(catalogo, valor) {
    const vistos = new Map();
    for (const producto of catalogo) {
        const complemento = valor - producto.precio;
        if (vistos.has(complemento)) {
            return [vistos.get(complemento), producto];
        }
        vistos.set(producto.precio, producto);
    }
    return null;
}

function productoEstrellaPorCiudad(ventas) {
    const conteoPorCiudad = new Map();
    for (const venta of ventas) {
        const ciudad = venta.ciudad.trim().toLowerCase();
        if (!conteoPorCiudad.has(ciudad)) {
            conteoPorCiudad.set(ciudad, new Map());
        }
        const conteoProductos = conteoPorCiudad.get(ciudad);
        if (conteoProductos.has(venta.producto)) {
            conteoProductos.set(venta.producto, conteoProductos.get(venta.producto) + 1);
        } else {
            conteoProductos.set(venta.producto, 1);
        }
    }

    const estrellas = {};
    for (const [ciudad, conteoProductos] of conteoPorCiudad) {
        let mejorProducto = null;
        let mejorCuenta = 0;
        for (const [producto, cuenta] of conteoProductos) {
            if (cuenta > mejorCuenta) {
                mejorProducto = producto;
                mejorCuenta = cuenta;
            }
        }
        estrellas[ciudad] = mejorProducto;
    }
    return estrellas;
}

function primerClienteUnico(ventas) {
    const compras = comprasPorCliente(ventas);
    for (const venta of ventas) {
        if (compras.get(venta.cliente) === 1) {
            return venta.cliente;
        }
    }
    return null;
}

module.exports = {valorVenta, totalVendido, unidadesVendidas, ventaMayor, ticketPromedio, ventasPorCiudad, totalVendidoM, unidadesVendidasM, ventasPorCiudadM, compFunciones, totalPorCiudad, unidadesPorProducto, topProductosPorValor, ventasDelDia, totalVendidoI, ventaMayorI, totalPorCiudadI, primerVentaI, clientesRecurrentes, totalCiudadUnaPasada,totalCiudadCadena, clientesRecurrentesSet, comprasPorCliente, clientesRecurrentesMap, comboRegaloFuerzaBruta, comboRegalo, productoEstrellaPorCiudad,primerClienteUnico};