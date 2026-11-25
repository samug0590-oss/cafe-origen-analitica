# Rendimiento del motor de analitica - Cafe Origen v0.2

## 1. Resumen


## 2. Como se midio
- Datos: ventas generadas con src/generador.js, n = 10.000.
- Operaciones: contador manual (1 por visita y 1 por comparacion).
- Tiempo: console.time, promedio de varias repeticiones.
- Equipo: (describe tu computador brevemente).
- Complejidad espacial: se cuenta la memoria extra que crea la funcion, sin contar los datos de entrada.

## 3. Clasificacion de las funciones

| Funcion              | Que hace                                                                    | Tiempo         | Espacio | Justificacion                                                        | Medicion con 10.000 ventas |
|----------------------|-----------------------------------------------------------------------------|----------------|---------|----------------------------------------------------------------------|----------------------------|
| valorVenta           | Calcula el valor total de la venta                                          | O(1)           | O(1)    | Una multiplicacion, sin ciclo                                        | Menos de 1ms               |
| totalVendido         | Calcula el valor total de todas las ventas                                  | O(n)           | O(1)    | Un ciclo, acumulador                                                 | 10.000 ops                 |
| unidadesVendidas     | calcula el total de las unidades vendidas                                   | O(n)           | O(1)    | Un ciclo, acumulador                                                 | 1,065ms                    |
| ventaMayor           | Compara y regresa la venta mas grande                                       | O(n)           | O(1)    | Un ciclo, el ganador es una referencia, no una copia                 | 20,000 ops                 |
| ticketPromedio       | Calcula el promedio de cuanto gasta un cliente cada que compra              | O(n)           | O(1)    | Un ciclo, con acumulador y contador                                  | 1,561ms                    |
| ventasPorCiudad      | Calcula el total de las ventas por la ciudad                                | O(n)           | O(1)    | Un ciclo, con condicion                                              | 1,232ms                    |
| totalVendidoM        | Calcula el valor total de todas las ventas con metodos                      | O(n)           | O(1)    | Un reduce, devuelve un numero                                        | 10.000 ops                 |
| unidadesVendidasM    | Calcula el total de las unidades vendidas con metodos                       | O(n)           | O(1)    | Un reduce, devuelve un numero                                        | 1,065ms                    |
| ventasPorCiudadM     | Calcula el total de las ventas por la ciudad con metodos                    | O(n)           | O(n)    | El filter crea un arreglo                                            | 1,232ms                    |
| totalPorCiudad       | Calcula el total de cada ciudad                                             | O(n)           | O(g)    | Un ciclo, el diccionario crece con los grupos (g), no con las ventas | 20.000 ops                 |
| unidadesPorProducto  | Calcula la cantidad que se vendio de cada producto                          | O(n)           | O(g)    | Un ciclo, el diccionario crece con los grupos (g), no con las ventas | 2,721ms                    |
| topProductosPorValor | Muestra n cantidad de los mejores productos por su valor del mayor al menor | O(n + p log p) | O(p)    | Un ciclo para agrupar, y un sort sobre p productos distintos         | 2,505ms                    |
| ventasDelDia         | Calcula las ventas de un dia especifico                                     | O(n)           | O(m)    | Un ciclo, guarda las ventas de ese dia                               | 1,139ms                    |
| clientesRecurrentes  | Muestra a los clientes que han comprado mas de una vez                      | O(n^2)         | O(r)    | Ciclo anidado, r clientes repetidos                                  | 407,202ms                  |
| totalCiudadCadena    | Calcula el total de las ventas de una ciudad con una cadena de metodos      | O(n)           | O(n)    | 4 recorridos y 3 arreglos intermedios                                | 3,138ms                    |
| totalCiudadUnaPasada | Calcula el total de las ventas de una ciudad en una pasada                  | O(n)           | O(1)    | Un solo recorrido, sin arreglos                                      | 1,556ms                    |
| primerVenta          | Muestra la primer venta                                                     | O(1)           | O(1)    | Un acceso por indice                                                 | 1 ops                      |

## 4. Proyeccion a 1.000.000 de ventas

| Funcion | Medido con 10.000 | Factor | Estimado con 1.000.000 |
|---------|-------------------|--------|------------------------|
| ... | ... | ... | ... |

Limites: es una estimacion calculada a partir de las mediciones, no una garantia.

## 5. Riesgos


## 6. Plan de optimizacion


## 7. Limitaciones
