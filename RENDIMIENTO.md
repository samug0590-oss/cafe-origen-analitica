# Rendimiento del motor de analitica - Cafe Origen v0.2

## 1. Resumen
Café Origen es un negocio de café y productos relacionados, y este proyecto es su motor de analítica de ventas. Toma el historial de ventas y genera un reporte por consola para revisar los resultados del negocio.

## 2. Como se midio
- Datos: ventas generadas con src/generador.js, n = 10.000.
- Operaciones: contador manual (1 por visita y 1 por comparacion).
- Tiempo: console.time, promedio de varias repeticiones.
- Equipo: Compumax Halcon Series.
- Complejidad espacial: se cuenta la memoria extra que crea la funcion, sin contar los datos de entrada.

## 3. Clasificacion de las funciones

| Funcion                   | Que hace                                                                    | Tiempo         | Espacio  | Justificacion                                                                          | Medicion con 10.000 ventas |
|---------------------------|-----------------------------------------------------------------------------|----------------|----------|----------------------------------------------------------------------------------------|----------------------------|
| valorVenta                | Calcula el valor total de la venta                                          | O(1)           | O(1)     | Una multiplicacion, sin ciclo                                                          | Menos de 1ms               |
| totalVendido              | Calcula el valor total de todas las ventas                                  | O(n)           | O(1)     | Un ciclo, acumulador                                                                   | 10.000 ops                 |
| unidadesVendidas          | calcula el total de las unidades vendidas                                   | O(n)           | O(1)     |  Un ciclo, acumulador                                                                  | 1,065ms                    |
| ventaMayor                | Compara y regresa la venta mas grande                                       | O(n)           | O(1)     | Un ciclo, el ganador es una referencia, no una copia                                   | 20,000 ops                 |
| ticketPromedio            | Calcula el promedio de cuanto gasta un cliente cada que compra              | O(n)           | O(1)     | Un ciclo, con acumulador y contador                                                    | 1,561ms                    |
| ventasPorCiudad           | Calcula el total de las ventas por la ciudad                                | O(n)           | O(1)     | Un ciclo, con condicion                                                                | 1,232ms                    |
| totalVendidoM             | Calcula el valor total de todas las ventas con metodos                      | O(n)           | O(1)     | Un reduce, devuelve un numero                                                          | 10.000 ops                 |
| unidadesVendidasM         | Calcula el total de las unidades vendidas con metodos                       | O(n)           | O(1)     | Un reduce, devuelve un numero                                                          | 1,065ms                    |
| ventasPorCiudadM          | Calcula el total de las ventas por la ciudad con metodos                    | O(n)           | O(n)     | El filter crea un arreglo                                                              | 1,232ms                    |
| totalPorCiudad            | Calcula el total de cada ciudad                                             | O(n)           | O(g)     | Un ciclo, el diccionario crece con los grupos (g), no con las ventas                   | 20.000 ops                 |
| unidadesPorProducto       | Calcula la cantidad que se vendio de cada producto                          | O(n)           | O(g)     | Un ciclo, el diccionario crece con los grupos (g), no con las ventas                   | 2,721ms                    |
| topProductosPorValor      | Muestra n cantidad de los mejores productos por su valor del mayor al menor | O(n + p log p) | O(p)     | Un ciclo para agrupar, y un sort sobre p productos distintos                           | 2,505ms                    |
| ventasDelDia              | Calcula las ventas de un dia especifico                                     | O(n)           | O(m)     | Un ciclo, guarda las ventas de ese dia                                                 | 1,139ms                    |
| clientesRecurrentes       | Muestra a los clientes que han comprado mas de una vez                      | O(n^2)         | O(r)     | Ciclo anidado, r clientes repetidos                                                    | 407,202ms                  |
| totalCiudadCadena         | Calcula el total de las ventas de una ciudad con una cadena de metodos      | O(n)           | O(n)     | 4 recorridos y 3 arreglos intermedios                                                  | 3,138ms                    |
| totalCiudadUnaPasada      | Calcula el total de las ventas de una ciudad en una pasada                  | O(n)           | O(1)     | Un solo recorrido, sin arreglos                                                        | 1,556ms                    |
| primerVenta               | Muestra la primer venta                                                     | O(1)           | O(1)     | Un acceso por indice                                                                   | 1 ops                      |
| clientesRecurrentesSet    | Clientes con mas de una compra, usando dos Set                              | O(n)           | O(c)     | Un solo for...of; has y add son O(1); guarda los clientes vistos y los recurrentes     | no medido en v0.2          |
| comprasPorCliente         | Cuenta las compras de cada cliente en un Map                                | O(n)           | O(c)     | Un solo for...of con has, get y set en O(1); el Map crece con los clientes distintos   | no medido en v0.2          | 
| clientesRecurrentesMap    | Extrae del Map los clientes con mas de una compra                           | O(c)           | O(r)     | Un for...of sobre las entradas del Map (c); el arreglo guarda solo los recurrentes (r) | no medido en v0.2          |
| comboRegaloFuerzaBruta    | Busca dos productos que sumen un valor probando todos los pares             | O(n^2)         | O(1)     | Dos ciclos anidados sobre el catalogo; solo usa indices                                | no medido en v0.2          |
| comboRegalo               | Busca dos productos que sumen un valor con un Map de precios vistos         | O(n)           | O(n)     | Un solo ciclo; has y set son O(1); el Map puede guardar todos los precios              | no medido en v0.2          |
| productoEstrellaPorCiudad | Producto con mas apariciones en cada ciudad                                 | O(n)           | O(c x p) | Un recorrido de las ventas y otro de los Maps, con a lo sumo n entradas en total       | no medido en v0.2          |
| primerClienteUnico        | Primer cliente que aparece una sola vez                                     | O(n)           | O(c)     | Dos recorridos (2n = O(n)); un Map con los clientes distintos                          | no medido en v0.2          |

## 4. Proyeccion a 1.000.000 de ventas

| Funcion              | Medido con 10.000 | Factor | Estimado con 1.000.000 |
|----------------------|-------------------|--------|------------------------|
| valorVenta           | Menos de 1ms      | 1      | Menos de 1ms           |
| totalVendido         | 10.000 ops        | 100    | 1.000.000              |
| unidadesVendidas     | 1,065ms           | 100    | 106,5ms                |
| ventaMayor           | 20,000 ops        | 100    | 2.000.000 ops          |
| ticketPromedio       | 1,561ms           | 100    | 156,1ms                |
| ventasPorCiudad      | 1,232ms           | 100    | 123,2ms                |
| totalVendidoM        | 10.000 ops        | 100    | 1.000.000 ops          |
| unidadesVendidasM    | 1,065ms           | 100    | 106,5ms                |
| ventasPorCiudadM     | 1,232ms           | 100    | 123,2ms                |
| totalPorCiudad       | 20.000 ops        | 100    | 2.000.000 ops          |
| unidadesPorProducto  | 2,721ms           | 100    | 272,1ms                |
| topProductosPorValor | 2,505ms           | 100    | 250,5ms                |
| ventasDelDia         | 1,139ms           | 100    | 113,9ms                |
| clientesRecurrentes  | 407,202ms         | 10.000 | 67,867mins             |
| totalCiudadCadena    | 3,138ms           | 100    | 313,8ms                |
| totalCiudadUnaPasada | 1,556ms           | 100    | 155,6ms                |
| primerVenta          | 1 op              | 1      | 1 op                   |

Es una estimacion calculada a partir de las mediciones, no una garantia.

## 5. Riesgos
Nivel: Alto
-clientesRecurrentes
Por que:
O(n²) en tiempo; ya "se quedo pensando" en la historia del Minireto 6

Nivel: Medio
-totalCiudadCadena
-ventasPorCiudadM
-ventasDelDia
Por que:
O(n) en tiempo pero con memoria O(n): crean arreglos grandes

Nivel: Medio-bajo
-topProductosPorValor
-totalPorCiudad
-unidadesPorProducto
Por que:
O(n) en tiempo; memoria proporcional a los grupos, no a las ventas; el sort sube un poco el costo

Nivel: Bajo
-El resto de funciones con O(1) de memoria
Por que:
Crecen en proporcion y no consumen memoria extra

Nivel: Ninguno
-valorVenta
-primerVenta
Por que:
O(1)

## 6. Plan de optimizacion
Problema: clientesRecurrentes repite las comparaciones sobre las ventas muchas veces O(n²)
Idea: Se almacenaria una libre (un diccionario) con la cuenta de compras por cliente, se recorren las ventas 1 sola vez, anotando cuantas veces aparece cada cliente. Al final los recurrentes son los que tinen cuenta mayor a 1
Resultado esperado: El tiempo pasaria de 0(n²) a 0(n)
Costo: Se usa memoria extra proporcional a los clientes distintos, O(c) a cambio de tiempo
Aclaracion: Esta seccion es un plan, la implementacion es del MiniReto 9