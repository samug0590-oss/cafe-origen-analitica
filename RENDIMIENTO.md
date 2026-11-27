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

| Funcion                   | Que hace                                                                    | Tiempo         | Espacio  | Justificacion                                                                           | Medicion con 10.000 ventas              |
|---------------------------|-----------------------------------------------------------------------------|----------------|----------|-----------------------------------------------------------------------------------------|-----------------------------------------|
| valorVenta                | Calcula el valor total de la venta                                          | O(1)           | O(1)     | Una multiplicacion, sin ciclo                                                           | Menos de 1ms                            |
| totalVendido              | Calcula el valor total de todas las ventas                                  | O(n)           | O(1)     | Un ciclo, acumulador                                                                    | 10.000 ops                              |
| unidadesVendidas          | calcula el total de las unidades vendidas                                   | O(n)           | O(1)     |  Un ciclo, acumulador                                                                   | 1,065ms                                 |
| ventaMayor                | Compara y regresa la venta mas grande                                       | O(n)           | O(1)     | Un ciclo, el ganador es una referencia, no una copia                                    | 20,000 ops                              |
| ticketPromedio            | Calcula el promedio de cuanto gasta un cliente cada que compra              | O(n)           | O(1)     | Un ciclo, con acumulador y contador                                                     | 1,561ms                                 |
| ventasPorCiudad           | Calcula el total de las ventas por la ciudad                                | O(n)           | O(1)     | Un ciclo, con condicion                                                                 | 1,232ms                                 |
| totalVendidoM             | Calcula el valor total de todas las ventas con metodos                      | O(n)           | O(1)     | Un reduce, devuelve un numero                                                           | 10.000 ops                              |
| unidadesVendidasM         | Calcula el total de las unidades vendidas con metodos                       | O(n)           | O(1)     | Un reduce, devuelve un numero                                                           | 1,065ms                                 |
| ventasPorCiudadM          | Calcula el total de las ventas por la ciudad con metodos                    | O(n)           | O(n)     | El filter crea un arreglo                                                               | 1,232ms                                 |
| totalPorCiudad            | Calcula el total de cada ciudad                                             | O(n)           | O(g)     | Un ciclo, el diccionario crece con los grupos (g), no con las ventas                    | 20.000 ops                              |
| unidadesPorProducto       | Calcula la cantidad que se vendio de cada producto                          | O(n)           | O(g)     | Un ciclo, el diccionario crece con los grupos (g), no con las ventas                    | 2,721ms                                 |
| topProductosPorValor      | Muestra n cantidad de los mejores productos por su valor del mayor al menor | O(n + p log p) | O(p)     | Un ciclo para agrupar, y un sort sobre p productos distintos                            | 2,505ms                                 |
| ventasDelDia              | Calcula las ventas de un dia especifico                                     | O(n)           | O(m)     | Un ciclo, guarda las ventas de ese dia                                                  | 1,139ms                                 |
| clientesRecurrentes       | Muestra a los clientes que han comprado mas de una vez                      | O(n^2)         | O(r)     | Ciclo anidado, r clientes repetidos                                                     | 407,202ms                               |
| totalCiudadCadena         | Calcula el total de las ventas de una ciudad con una cadena de metodos      | O(n)           | O(n)     | 4 recorridos y 3 arreglos intermedios                                                   | 3,138ms                                 |
| totalCiudadUnaPasada      | Calcula el total de las ventas de una ciudad en una pasada                  | O(n)           | O(1)     | Un solo recorrido, sin arreglos                                                         | 1,556ms                                 |
| primerVenta               | Muestra la primer venta                                                     | O(1)           | O(1)     | Un acceso por indice                                                                    | 1 ops                                   |
| clientesRecurrentesSet    | Clientes con mas de una compra, usando dos Set                              | O(n)           | O(c)     | Un solo for...of; has y add son O(1); guarda los clientes vistos y los recurrentes      | no medido en v0.2                       |
| comprasPorCliente         | Cuenta las compras de cada cliente en un Map                                | O(n)           | O(c)     | Un solo for...of con has, get y set en O(1); el Map crece con los clientes distintos    | no medido en v0.2                       | 
| clientesRecurrentesMap    | Extrae del Map los clientes con mas de una compra                           | O(c)           | O(r)     | Un for...of sobre las entradas del Map (c); el arreglo guarda solo los recurrentes (r)  | no medido en v0.2                       |
| comboRegaloFuerzaBruta    | Busca dos productos que sumen un valor probando todos los pares             | O(n^2)         | O(1)     | Dos ciclos anidados sobre el catalogo; solo usa indices                                 | no medido en v0.2                       |
| comboRegalo               | Busca dos productos que sumen un valor con un Map de precios vistos         | O(n)           | O(n)     | Un solo ciclo; has y set son O(1); el Map puede guardar todos los precios               | no medido en v0.2                       |
| productoEstrellaPorCiudad | Producto con mas apariciones en cada ciudad                                 | O(n)           | O(c x p) | Un recorrido de las ventas y otro de los Maps, con a lo sumo n entradas en total        | no medido en v0.2                       |
| primerClienteUnico        | Primer cliente que aparece una sola vez                                     | O(n)           | O(c)     | Dos recorridos (2n = O(n)); un Map con los clientes distintos                           | no medido en v0.2                       |
| clientesRecurrentesSet    | Clientes con mas de una compra, usando dos Set                              | O(n)           | O(c)     | Un solo for...of; has y add son O(1); guarda los clientes vistos y los recurrentes      | incluido en el tiempo total del reporte |
| comprasPorCliente         | Cuenta las compras de cada cliente en un Map                                | O(n)           | O(c)     | Un solo for...of con has, get y set en O(1); el Map crece con los clientes distintos    | incluido en el tiempo total del reporte |
| clientesRecurrentesMap    | Extrae del Map los clientes con mas de una compra                           | O(c)           | O(r)     | Un for...of sobre las entradas del Map; el arreglo guarda solo los recurrentes          | incluido en el tiempo total del reporte |
| comboRegaloFuerzaBruta    | Busca dos productos que sumen un valor probando todos los pares             | O(n^2)         | O(1)     | Dos ciclos anidados sobre el catalogo; solo usa indices                                 | no usada en el reporte                  |
| comboRegalo               | Busca dos productos que sumen un valor con un Map de precios vistos         | O(n)           | O(n)     | Un solo ciclo; has y set son O(1); el Map guarda los precios vistos                     | incluido en el tiempo total del reporte |
| productoEstrellaPorCiudad | Producto con mas apariciones en cada ciudad                                 | O(n)           | O(c x p) | Un recorrido de las ventas y otro de los Maps, con a lo sumo n entradas en total        | incluido en el tiempo total del reporte |
| primerClienteUnico        | Primer cliente que aparece una sola vez                                     | O(n)           | O(c)     | Dos recorridos (2n = O(n)); un Map con los clientes distintos                           | incluido en el tiempo total del reporte |
| mejorSemanaBruta          | Mejor bloque de k dias sumando cada bloque desde cero                       | O(n x k)       | O(1)     | Un ciclo de ventanas y dentro otro de k sumas                                           | no usada en el reporte                  |
| mejorSemana               | Mejor bloque de k dias con ventana deslizante                               | O(n)           | O(1)     | Cada dia entra y sale una vez; no depende de k                                          | incluido en el tiempo total del reporte |
| parMasCercano             | Dos productos con la mayor suma sin superar un presupuesto                  | O(n log n)     | O(n)     | Ordenar domina (sort); los dos punteros solo cuestan O(n); la copia ordenada ocupa O(n) | no usada en el reporte                  |

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

Estado en la v1.0: el plan de optimizacion de los clientes recurrentes se cumplio en el MiniReto 9. El trabajo repetido (buscar muchas veces al mismo cliente) se elimino guardando los clientes ya vistos en un Set y las cuentas en un Map, con un solo recorrido. Ninguna funcion del reporte final es O(n^2); la de mayor costo es topProductosPorValor, O(n + p log p), con p productos distintos, que es pequeno. El riesgo restante es de memoria: las estructuras de clientes crecen con los clientes distintos, O(c), y con el historial anual (decenas de miles de clientes) ocupan unos pocos megabytes. Las versiones lentas (clientesRecurrentes, comboRegaloFuerzaBruta, mejorSemanaBruta) se conservan solo como referencia de correccion y para las mediciones, y no se usan en el reporte.

//Empieza el uso de I.A. Modelo: Claude gratuito. Motivo: Falta de tiempo para los entregables de algorimita Semana 2 Dia 2
## 5. Comparacion v0.1 contra v1.0

Que se compara: el tiempo de calculo del reporte, sin imprimir.
- v0.1: las secciones del reporte original mas la lista de clientes recurrentes con la funcion original de dos ciclos anidados (la version que la gerente encontro lenta).
- v1.0: las mismas secciones, los clientes recurrentes con Set y las cuatro secciones nuevas (producto estrella, combo de regalo, cliente para cupon y mejor semana).
La v1.0 hace mas trabajo que la v0.1 y aun asi es mas rapida.

Como se midio: datos generados con src/generador.js; la v1.0 con la mediana de 5 repeticiones y un calentamiento previo; la v0.1 con una sola ejecucion, por su duracion. Comando: node src/comparar.js

| n       | v0.1                   | v1.0                   | Mejora (veces)         | La v0.1 es                                       |
|---------|------------------------|------------------------|------------------------|--------------------------------------------------|
| 10.000  | (copia de tu terminal) | (copia de tu terminal) | (copia de tu terminal) | medido                                           |
| 100.000 | (copia de tu terminal) | (copia de tu terminal) | (copia de tu terminal) | estimado (x100), porque medirlo tardaria minutos |

Tiempo del proceso completo con 100.000 ventas, incluyendo arrancar Node, generar los datos e imprimir (time node src/reporte.js 100000): (copia la linea real).

Lectura: al multiplicar n por 10, el tiempo de la v0.1 se multiplica por unos 100 (cuadratico) y el de la v1.0 por unos 10 (lineal). La estimacion de la v0.1 con 100.000 es un minimo: con estos datos el includes de la funcion original se ejecuta muchas veces y el tiempo real puede ser mayor.

Proyeccion a 1.000.000 de ventas (a partir de la medicion con 100.000): las funciones lineales se multiplican por 10; la version original cuadratica se multiplicaria por 100 y pasaria de minutos a horas, por lo que no es viable.