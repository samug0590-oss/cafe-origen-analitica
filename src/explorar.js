const ventas = require('./datos.js')

console.log(ventas)
console.log(ventas.length)
console.log(ventas[0])
console.log(ventas[11])
console.log(ventas[4].producto)

console.table(ventas)

console.log(ventas[0].ciudad === ventas[4].ciudad)