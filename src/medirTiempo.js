const {clientesRecurrentes} = require('./analitica');
const {generarVentas} = require('./generador')

const tamanos = [1000, 2000, 4000, 8000, 16000, 100000]

function algo(tamanos) {
    for (tamanos of tamanos) {
        const ventas = generarVentas(tamanos)
        console.time("mi-medicion")
        clientesRecurrentes(ventas)
        console.timeEnd("mi-medicion")
    }
}

algo(tamanos)