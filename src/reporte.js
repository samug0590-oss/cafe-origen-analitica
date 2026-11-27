const { performance } = require("perf_hooks");
const ventasReales = require("./datos");
const catalogo = require("./catalogo");
const ventasDiarias = require("./ventasDiarias");
const { generarVentas } = require("./generador");
const {
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor,
    ventasDelDia,
    clientesRecurrentesSet,
    productoEstrellaPorCiudad,
    primerClienteUnico,
    comboRegalo,
    mejorSemana
} = require("./analitica");

const ANCHO_NOMBRE = 28;
const ANCHO_VALOR = 14;
const ANCHO_LINEA = ANCHO_NOMBRE + 1 + ANCHO_VALOR;
const TARJETA_REGALO = 87000;
const DIAS_SEMANA = 7;
const DIA_CON_VENTAS = "2026-09-01";
const DIA_SIN_VENTAS = "2026-09-30";

//Empieza el uso de I.A. Modelo: Claude gratuito. Motivo: Falta de tiempo para los entregables de algorimita Semana 2 Dia 2
// ---------- Utilidades de formato ----------

function pesos(valor) {
    if (valor === null || valor === undefined) {
        return "sin datos";
    }
    return `$${Math.round(valor).toLocaleString("es-CO")}`;
}

function mayuscula(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function titulo(texto) {
    console.log("=".repeat(ANCHO_LINEA));
    console.log(texto.toUpperCase());
    console.log("=".repeat(ANCHO_LINEA));
}

function seccion(texto) {
    console.log("");
    console.log("-".repeat(ANCHO_LINEA));
    console.log(texto.toUpperCase());
    console.log("-".repeat(ANCHO_LINEA));
}

function fila(etiqueta, valor) {
    console.log(`${etiqueta.padEnd(ANCHO_NOMBRE)} ${String(valor).padStart(ANCHO_VALOR)}`);
}

// ---------- Lectura del parametro ----------

function leerTamano() {
    const argumento = process.argv[2];
    if (argumento === undefined) {
        return null;
    }
    const n = Number(argumento);
    if (!Number.isInteger(n) || n <= 0) {
        console.log("Uso: node src/reporte.js [n]");
        console.log("  sin n: usa los datos reales del Dia 1 (12 ventas)");
        console.log("  con n: genera n ventas al azar (ejemplo: node src/reporte.js 100000)");
        process.exit(1);
    }
    return n;
}

// ---------- Secciones ----------

function resumenGeneral(ventas) {
    seccion("resumen general");
    fila("Ventas registradas", ventas.length.toLocaleString("es-CO"));
    fila("Total vendido", pesos(totalVendido(ventas)));
    fila("Unidades vendidas", unidadesVendidas(ventas).toLocaleString("es-CO"));
    fila("Ticket promedio", pesos(ticketPromedio(ventas)));
    const mayor = ventaMayor(ventas);
    if (mayor === null) {
        fila("Venta mayor", "sin datos");
    } else {
        fila("Venta mayor", pesos(valorVenta(mayor)));
        console.log(`  (${mayor.producto}, ${mayor.ciudad.trim()})`);
    }
}

function seccionCiudades(ventas) {
    seccion("ventas por ciudad");
    for (const [ciudad, total] of Object.entries(totalPorCiudad(ventas))) {
        fila(mayuscula(ciudad), pesos(total));
    }
}

function seccionUnidades(ventas) {
    seccion("unidades por producto");
    for (const [producto, unidades] of Object.entries(unidadesPorProducto(ventas))) {
        fila(mayuscula(producto), unidades.toLocaleString("es-CO"));
    }
}

function seccionTop(ventas) {
    seccion("top 3 productos por valor");
    const top = topProductosPorValor(ventas, 3);
    for (let i = 0; i < top.length; i++) {
        const [producto, valor] = top[i];
        fila(`${i + 1}. ${mayuscula(producto)}`, pesos(valor));
    }
}

function seccionRecurrentes(ventas) {
    seccion("clientes recurrentes");
    const recurrentes = clientesRecurrentesSet(ventas);
    fila("Clientes con 2 o mas compras", recurrentes.length.toLocaleString("es-CO"));
    if (recurrentes.length > 0) {
        const muestra = recurrentes.slice(0, 5).join(", ");
        console.log(`  Ejemplos: ${muestra}${recurrentes.length > 5 ? ", ..." : ""}`);
    }
}

function seccionEstrella(ventas) {
    seccion("producto estrella por ciudad");
    for (const [ciudad, producto] of Object.entries(productoEstrellaPorCiudad(ventas))) {
        console.log(`${mayuscula(ciudad).padEnd(12)} ${producto}`);
    }
}

function seccionCombo() {
    seccion(`combo para tarjeta de ${pesos(TARJETA_REGALO)}`);
    const combo = comboRegalo(catalogo, TARJETA_REGALO);
    if (combo === null) {
        console.log("Sin combinacion exacta");
        return;
    }
    for (const producto of combo) {
        fila(producto.nombre, pesos(producto.precio));
    }
    fila("Suma", pesos(combo[0].precio + combo[1].precio));
}

function seccionCupon(ventas) {
    seccion("cliente para cupon de regreso");
    const cliente = primerClienteUnico(ventas);
    fila("Primer cliente de 1 compra", cliente === null ? "sin datos" : cliente);
}

function seccionMejorSemana() {
    seccion("mejor semana de septiembre");
    const mejor = mejorSemana(ventasDiarias, DIAS_SEMANA);
    if (mejor === null) {
        console.log("Sin datos suficientes");
        return;
    }
    const fin = mejor.inicio + DIAS_SEMANA - 1;
    fila("Semana", `dias ${mejor.inicio} al ${fin}`);
    fila("Total de la semana", pesos(mejor.total * 1000));
    console.log("  (totales diarios de septiembre, en src/ventasDiarias.js)");
}

function resumenDia(ventas, fecha) {
    seccion(`resumen del dia ${fecha}`);
    const delDia = ventasDelDia(ventas, fecha);
    if (delDia.length === 0) {
        console.log("Sin ventas este dia");
    }
    fila("Total vendido", pesos(totalVendido(delDia)));
    fila("Unidades vendidas", unidadesVendidas(delDia).toLocaleString("es-CO"));
    fila("Ticket promedio", pesos(ticketPromedio(delDia)));
}

// ---------- Programa principal ----------

function main() {
    const n = leerTamano();
    let ventas;
    let origen;
    let tiempoGeneracion = null;

    if (n === null) {
        ventas = ventasReales;
        origen = `datos reales del Dia 1 (${ventas.length} ventas)`;
    } else {
        const inicioGeneracion = performance.now();
        ventas = generarVentas(n);
        tiempoGeneracion = performance.now() - inicioGeneracion;
        origen = `${n.toLocaleString("es-CO")} ventas generadas al azar`;
    }

    titulo("cafe origen - reporte de ventas v1.0");
    console.log(`Datos: ${origen}`);

    const inicio = performance.now();
    resumenGeneral(ventas);
    seccionCiudades(ventas);
    seccionUnidades(ventas);
    seccionTop(ventas);
    seccionRecurrentes(ventas);
    seccionEstrella(ventas);
    seccionCombo();
    seccionCupon(ventas);
    seccionMejorSemana();
    resumenDia(ventas, DIA_CON_VENTAS);
    resumenDia(ventas, DIA_SIN_VENTAS);
    const duracion = performance.now() - inicio;

    seccion("tiempos");
    if (tiempoGeneracion !== null) {
        fila("Generacion de datos", `${Math.round(tiempoGeneracion)} ms`);
    }
    fila("Analisis y reporte", `${Math.round(duracion)} ms`);
}

main();
//Fin del uso de la ia