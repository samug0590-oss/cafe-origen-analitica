//Empieza el uso de I.A. Modelo: Claude gratuito. Motivo: Falta de tiempo para los entregables de algorimita Semana 2 Dia 2
const { performance } = require("perf_hooks");
const { generarVentas } = require("./generador");
const catalogo = require("./catalogo");
const ventasDiarias = require("./ventasDiarias");
const {
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor,
    ventasDelDia,
    clientesRecurrentes,
    clientesRecurrentesSet,
    productoEstrellaPorCiudad,
    primerClienteUnico,
    comboRegalo,
    mejorSemana
} = require("./analitica");

const TAMANOS = [10000, 100000];
const REPETICIONES_V10 = 5;
const MODO_REAL = process.argv.includes("--real");

// Secciones que ya existian en el reporte v0.1
function seccionesBase(ventas) {
    totalVendido(ventas);
    unidadesVendidas(ventas);
    ticketPromedio(ventas);
    ventaMayor(ventas);
    totalPorCiudad(ventas);
    unidadesPorProducto(ventas);
    topProductosPorValor(ventas, 3);
    ventasDelDia(ventas, "2026-09-01");
    ventasDelDia(ventas, "2026-09-30");
}

// v0.1: secciones base + clientes recurrentes con la funcion original (O(n^2))
function calcularV01(ventas) {
    seccionesBase(ventas);
    clientesRecurrentes(ventas);
}

// v1.0: secciones base + recurrentes con Set + las cuatro secciones nuevas
function calcularV10(ventas) {
    seccionesBase(ventas);
    clientesRecurrentesSet(ventas);
    productoEstrellaPorCiudad(ventas);
    comboRegalo(catalogo, 87000);
    primerClienteUnico(ventas);
    mejorSemana(ventasDiarias, 7);
}

function mediana(valores) {
    const ordenados = [...valores].sort((a, b) => a - b);
    return ordenados[Math.floor(ordenados.length / 2)];
}

function medirV10(ventas) {
    const tiempos = [];
    for (let i = 0; i < REPETICIONES_V10; i++) {
        const inicio = performance.now();
        calcularV10(ventas);
        tiempos.push(performance.now() - inicio);
    }
    return mediana(tiempos);
}

function medirV01(ventas) {
    const inicio = performance.now();
    calcularV01(ventas);
    return performance.now() - inicio;
}

function formatear(ms) {
    if (ms < 1000) {
        return `${ms.toFixed(1)} ms`;
    }
    const segundos = ms / 1000;
    if (segundos < 120) {
        return `${segundos.toFixed(2)} s`;
    }
    return `${(segundos / 60).toFixed(1)} min`;
}

console.log("Comparacion v0.1 contra v1.0 (solo calculo, sin imprimir)");
console.log("v0.1 = secciones originales + clientes recurrentes original");
console.log("v1.0 = secciones originales + recurrentes con Set + 4 secciones nuevas");
console.log("");

calcularV10(generarVentas(1000)); // calentamiento

const filas = [];
let v01En10000 = null;

for (const n of TAMANOS) {
    const ventas = generarVentas(n);
    const v10 = medirV10(ventas);

    let v01;
    let fuente;
    if (n === TAMANOS[0] || MODO_REAL) {
        console.log(`Midiendo v0.1 con ${n} ventas (puede tardar)...`);
        v01 = medirV01(ventas);
        fuente = "medido";
        if (n === TAMANOS[0]) {
            v01En10000 = v01;
        }
    } else {
        v01 = v01En10000 * (n / TAMANOS[0]) ** 2;
        fuente = "estimado (x100)";
    }

    filas.push({
        n: n,
        "v0.1": formatear(v01),
        "v1.0": formatear(v10),
        "mejora (veces)": Math.round(v01 / v10),
        "v0.1 es": fuente
    });
}

console.table(filas);
//Termina el uso de la ia