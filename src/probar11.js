//Empieza el uso de I.A. Modelo: Claude gratuito. Motivo: Falta de tiempo para los entregables de algorimita Semana 2 Dia 2
const catalogo = require("./catalogo");
const ventasDiarias = require("./ventasDiarias");
const { mejorSemanaBruta, mejorSemana, parMasCercano } = require("./analitica");

console.log("--- Mejor semana de septiembre (k = 7) ---");
console.log("bruta:  ", mejorSemanaBruta(ventasDiarias, 7));
console.log("ventana:", mejorSemana(ventasDiarias, 7));

console.log("--- Casos borde de la ventana ---");
console.log("k mayor que los dias:", mejorSemana(ventasDiarias, 31), mejorSemanaBruta(ventasDiarias, 31));
console.log("sin dias:", mejorSemana([], 7), mejorSemanaBruta([], 7));
console.log("k = 0:", mejorSemana(ventasDiarias, 0), mejorSemanaBruta(ventasDiarias, 0));
console.log("k = 1:", mejorSemana(ventasDiarias, 1), mejorSemanaBruta(ventasDiarias, 1));
console.log("k = 30:", mejorSemana(ventasDiarias, 30), mejorSemanaBruta(ventasDiarias, 30));

console.log("--- 100.000 dias al azar ---");
function generarDias(n) {
    const dias = [];
    for (let i = 0; i < n; i++) {
        dias.push(Math.floor(Math.random() * 601) + 200);
    }
    return dias;
}
const muchos = generarDias(100000);
for (const k of [7, 1000]) {
    console.time(`bruta k=${k}`);
    const a = mejorSemanaBruta(muchos, k);
    console.timeEnd(`bruta k=${k}`);
    console.time(`ventana k=${k}`);
    const b = mejorSemana(muchos, k);
    console.timeEnd(`ventana k=${k}`);
    const igual = a.total === b.total && a.inicio === b.inicio;
    console.log(`k=${k}:`, igual ? "OK" : "DIFERENTE", a, b);
}

console.log("--- parMasCercano ---");
function describir(par) {
    if (par === null) {
        return null;
    }
    return `${par[0].nombre} (${par[0].precio}) + ${par[1].nombre} (${par[1].precio}) = ${par[0].precio + par[1].precio}`;
}
for (const presupuesto of [100000, 140000, 40000]) {
    console.log(presupuesto, "->", describir(parMasCercano(catalogo, presupuesto)));
}
console.log("catalogo vacio:", parMasCercano([], 100000));
console.log("un producto:", parMasCercano([catalogo[0]], 100000));
console.log("catalogo sin alterar:", catalogo[0].nombre, "/", catalogo[7].nombre);

console.log("--- parMasCercano contra fuerza bruta ---");
function mejorSumaBruta(productos, presupuesto) {
    let mejor = -1;
    for (let i = 0; i < productos.length; i++) {
        for (let j = i + 1; j < productos.length; j++) {
            const suma = productos[i].precio + productos[j].precio;
            if (suma <= presupuesto && suma > mejor) {
                mejor = suma;
            }
        }
    }
    return mejor;
}
let fallos = 0;
for (let presupuesto = 0; presupuesto <= 250000; presupuesto += 500) {
    const par = parMasCercano(catalogo, presupuesto);
    const obtenido = par === null ? -1 : par[0].precio + par[1].precio;
    if (obtenido !== mejorSumaBruta(catalogo, presupuesto)) {
        fallos++;
        console.log("DIFERENTE con presupuesto", presupuesto);
    }
}
console.log(fallos === 0 ? "OK: coincide en todos los presupuestos probados" : `${fallos} diferencias`);
//Termina el uso de la I.A