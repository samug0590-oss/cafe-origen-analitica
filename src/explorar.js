/*const ventas = require('./datos.js')

console.log(ventas)
console.log(ventas.length)
console.log(ventas[0])
console.log(ventas[11])
console.log(ventas[4].producto)

console.table(ventas)

console.log(ventas[0].ciudad === ventas[4].ciudad)
const n = [10, 20, 30];

n.push(40)
n.pop()
n.unshift(5)
n.shift()

console.log(n)
*/

const precios = [30, 10, 25, 60, 80, 40];

const resultado = precios.filter(precio => precio < precios[precios.length-1] - 5);
const resultado1 = precios.filter(precio => precio > precios[0] - 5);

console.log(resultado)
console.log(resultado1)

function noMethod (precios) {
    const resultado2 = []
    for (let i = 0; i < precios.length; i++) {
        if (precios[i] < precios[precios.length - 1] - 5) {
            resultado2.push(precios[i])
        }
    }
    return resultado2
}

console.log(noMethod(precios))