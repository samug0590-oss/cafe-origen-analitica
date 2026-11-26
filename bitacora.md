Dia 1 (17/11/2026)

## Diccionario de datos

| Propiedad | Tipo | Significado                                |
|-----------|------|--------------------------------------------|
|id         |String|EL identificador de la compra               |
|fecha      |String|La fecha a la hora de la compra             |
|cliente    |String|EL identificador de el cliente              |
|producto   |String|Nombre y cantidad del producto              |
|ciudad     |String|Nombre de la ciudad de la compra            |
|cantidad   |Number|Cantidad del producto en la compra          |
|precio     |Number|Pracio del producto INDIVIDUAL no por compra|

# Casos borde:
(1)
medellín(id=5) === Medellín(id=1) 
false

Puede cambiar el orden de las ciudades al momento de ordenarlas y/o causar un error al momento de filtar por las mismas
Se va a modificar el diferente (id=5) para que sea igual al resto de la ciudades (Medellín)

(2)
cantidad(id=7) = 0

Va a hacer que al momento de calcular el total de la compra siempre sea 0, sin importar que producto se elija
No tiene sentido que una compra haya sido de 0 productos, se eliminara para evitar conflictos

(3)
cliente C01 se repite 3 veces (id=1, id=4, id=11)
cliente C02 se repite 2 veces (id=2, id=7)
cliente C03 se repite 2 veces (id=3, id=9)

Puede ser problema o no, ya que puede definir que un mismo cliente hizo diferentes compras, por ejemplo en periodos de tiempo distintos
Se dejara, ya que no necesariamente sea un problema, y no va a causar errores en los calculos

Dia 2 (18/11/2026)

## PseudoCodigo

Indicador: ValorVenta
Recorro: Cada cantidad y precio
Condicion: Que la cantidad y el precio sean mayores a cero
Accion: Multiplicar la cantidad por el precio, sumar 1 al contador
Al terminar: Vuelvo al contador

Indicador: TotalVendido
Recorro: Cada cantiad y precio
Condicion: Que la cantiad y el precio sean mayores a cero
Accion: Multiplicar la cantidad por el precio y sumar ese resultado con cada uno de los ValorVenta ya calculados, sumar 1 al contador
Al terminar: Volver al contador

Dia 3 (19/11/2026)

Indicador: unidadesVendidas
Recorro: Cada cantidad y producto
Condicion: Que la cantidad sea mayor a cero y que el producto sea un producto valido
Accion: Sumar todas las cantidades y sumo 1 al contador
Al terminar: Vuelvo al contador

Indicador: ventaMayor
Recorro: Cada cantidad y precio
Condicion: Que la cantidad y el precio sean mayores a cero
Accion: Multiplico cada cantidad y precio en sus parejas y comparo el resultado con los demas y sumo 1 al contador
Al terminar: Vuelvo al contador

Indicador: ticketPromedio
Recorro: Cada cantidad y precio
Condicion: Que la cantidad y el precio sean mayores a cero
Accion: Multiplico cada cantidad y precio en sus parejas, luego sumo cada resultado, y lo divido por el total de ventas, sumo 1 al contador
Al terminar: VUelvo al contador

Indicador: Ventas por ciudad
Recorro: Cada ciudad y su cantidad
Condicion: Que la ciudad sea valida y la cantidad mayor que cero
Accion: Sumo las cantidades de la misma ciudad, luego comparo este resultado entre uno y el otro, sumo 1 al contador
Al terminar: Vuelvo al contador

Pruebas:
valorVenta:
Entradas: completo, 0, vacio
Resultado esperado: Nan, resultado de el elegido, 0
Resultado obtenido: NaN, 84000, 0
Decision y porque: Resulta 0 ya que no hay ventas por lo tanto el valor es 0

totalVendido:
Entradas: completo, 1, vacio
Resultado esperado: 985000, 26000, 0
Resultado obtenido: 985000, 26000, 0
Decision y porque: Resulta 0 ya que no hay ventas por lo tanto el valor es 0

unidadesVendidas:
Entradas: completo, 3, vacio
Resultado esperado: 21, 1, 0
Resultado obtenido: 21, 1, 0
Decision y porque: Resulta 0 ya que no hay ventas por lo tanto el valor es 0

ventaMayor:
Entradas: completo, 11, vacio
Resultado esperado: registro id=10, registro id=12, null
Resultado obtenido: registro id=10, registro id=12, null
Decision y porque: Resulta en null porque no hay ningun registro para devolver

ticketPromedio:
Entradas: completo, 5, vacio
Resultado esperado: 89545.4545454, 52000, null
Resultado obtenido: 89545.4545454, 52000, null
Decision y porque: Resulta en null ya que decir 0 seria decir que los clientes no gastan nada, y null dice que no hay dato, es mas apropiado

ventasPorCiudad:
Entradas: ventas, medellín, 6, bogotá, vacio
Resultado esperado: 356000, 120000, 0
Resultado obtenido: 356000, 120000, 0
Decision y porque: Resulta 0 ya que no hay ventas por lo tanto el valor es 0

Trazas manuales

ventaMayor:

|Vuelta|Candidato actual|Valor venta actual|Valor venta candidato|Operacion                   |
|------|----------------|------------------|---------------------|----------------------------|
|inicio|null            |0                 |84000                |vVA < vVC = vVA <= vVC true |
|1     |id = 1          |84000             |26000                |vVA < vVC              false|
|2     |id = 1          |84000             |95000                |vVA < vVC = vVA <= vVC true |
|3     |id = 3          |95000             |42000                |vVA < vVC              false|
|4     |id = 3          |95000             |135000               |vVA < vVC = vVA <= vVC true |
|5     |id = 5          |135000            |52000                |vVA < vVC              false|
|6     |id = 5          |135000            |120000               |vVA < vVC              false|
|7     |id = 5          |135000            |0                    |vVA < vVC              false|
|8     |id = 5          |135000            |90000                |vVA < vVC              false|
|9     |id = 5          |135000            |168000               |vVA < vVC = vVA <= vVC true |
|10    |id = 10         |168000            |95000                |vVA < vVC              false|
|11    |id = 10         |168000            |78000                |vVA < vVC              false|
|12    |id = 10         |168000            |null                 |vVA < vVC              false|

Dia 4 (20/11/2026)
ventasPorCiudad:

|Vuelta|Ciudad elegida|Valor actual    |Ciudad siguiente|Valor venta ciudad siguiente|Operacion                         |
|------|--------------|----------------|----------------|----------------------------|----------------------------------|
|inicio|Medellín      |0               |Medellín        |84000                       |cE === cS (true) => vA = vA + vVCS|
|1     |Medelín       |84000           |Bogotá          |26000                       |cE === cS (false)                 |
|2     |Medellín      |84000           |Cali            |95000                       |cE === cS (false)                 |
|3     |Medellín      |84000           |Medellín        |42000                       |cE === cS (true) => vA = vA + vVCS|
|4     |Medellín      |126000          |Medellín        |135000                      |cE === cS (true) => vA = vA + vVCS|
|5     |Medellín      |261000          |Bogotá          |52000                       |cE === cS (false)                 |
|6     |Medellín      |261000          |Bogotá          |120000                      |cE === cS (false)                 |
|7     |Medellín      |261000          |Cali            |0                           |cE === cS (false)                 |
|8     |Medellín      |261000          |Cali            |90000                       |cE === cS (false)                 |
|9     |Medellín      |261000          |Pereira         |168000                      |cE === cS (false)                 |
|10    |Medellín      |261000          |Medellin        |95000                       |cE === cS (true) => vA = vA + vVCS|
|11    |Medellín      |356000          |Bogotá          |78000                       |cE === cS (false)                 |
|12    |Medellín      |356000          |null            |null                        |cE === cS (false)                 |

Dia 5 (21/11/2026)
totalVendidoM:
¿Qué recorro?	ventas
¿Qué filtro?	No es un filtro directo (if), pero se toma solo el valor total de esa venta
¿Qué transformo?    Nada se transforma
¿Qué acumulo?	El acumulador, suma todo
¿Cómo agrupo?	No agrupo

unidadesVendidasM:
¿Qué recorro?	ventas
¿Qué filtro?	No es un filtro directo (if), pero se toma solo la cantidad de esa venta
¿Qué transformo?	Nada se transforma
¿Qué acumulo?	El acumulador, suma todo
¿Cómo agrupo?	No agrupo

ventasPorCiudad:
¿Qué recorro?	ventas
¿Qué filtro?	No es un filtro directo (if), pero se toma solo la ciudad de esa venta
¿Qué transformo?	La ciudad se suaviza para que todas sean iguales
¿Qué acumulo?	El acumulador, suma todo
¿Cómo agrupo?	No agrupo

totalPorCiudad:
¿Qué recorro?	ventas
¿Qué filtro?	Primero se filtran como antes, solo tomando la ciudad, luego si el acumulador es "undefined" se le asigna valor a 0
¿Qué transformo?	La clave (ciudad) se suaviza para que cada ciudad sea igual
¿Qué acumulo?	El acumulador, suma el valor de cada clave(ciudad) respectivamente
¿Cómo agrupo?	ciudad

unidadesPorProducto:
¿Qué recorro?	ventas
¿Qué filtro?	Primero se filtran como antes, solo tomando el producto, luego si el acumulador es "undefined" se le asigna valor a 0
¿Qué transformo?	La clave (producto) se suaviza para que cada producto sea igual
¿Qué acumulo?	El acumulador, suma la cantidad de cada clave(producto) respectivamente
¿Cómo agrupo?	producto

topProductosPorValor:
¿Qué recorro?	ventas
¿Qué filtro?	Primero se filtran como antes, solo tomando el producto, luego si el acumulador es "undefined" se le asigna valor a 0
¿Qué transformo?	La clave (producto) se suaviza para que cada producto sea igual
¿Qué acumulo?	El acumulador, suma la cantidad de cada clave(producto) respectivamente
¿Cómo agrupo?	producto

## Registro de depuracion
Error 1: Bogota varias veces en totalPorCiudad
Síntoma: Bogota aparece varias veces en el listado con ventas distinas
Entrada que lo produce: Bogotá , Bogotá, bogotá
Hipotesis: Creo que el agrupador compara los datos y los toma como distintos
Prueba realizada: Imprimi en consola la funcion y salieron varios resultados en vez de uno
Causa: Lac clases no se normalizaban, faltan trim() y toLowerCase()
Correccion: Normalizar la clave antes de agrupar. Mi version lo hace en la linea 85 de analitica.js, lo pruebo en depuracion.js

Error 2: Ticket promedio daba NaN en un dia sin ventas
Sintoma: Nan aparece como resultado en la funcion ticketPromedio, en un dia sin ventas
Entrada que lo produce: No hay una entrada real que lo produzca, ya que el dia no tiene ventas
Hipotesis: Creo que es porque al no haber ventas, se toma como 0, y al final se dividiria 0/0, en javaScript eso es NaN
Prueba realizada: Imprimi en consola la funcion con el un argumento vacio para simular un dia sin ventas, salio NaN
Causa: El total se divide con el contador y ambos son 0, falta un comprobante
Correcion: Se usa el if que revise si el contador(cantidaValidas) es 0. Mi version lo hace en la linea 42 de analitica.js, lo pruebo en depuracion.js

Dia 5 (22/11/2026)
Predicciones:
Funcion: totalVendido
Mi prediccion si n x10: 10
Razonamiento: Por cada venta se hace una visita y al ser 10 ventas seria 10 operaciones

Funcion: ventaMayor
Mi prediccion si n x10: 20
Razonamiento: Por cada venta se hace una visita y una comparacion al ser 20 ventas seria 20 operaciones

Funcion: totalPorCiudad
Mi prediccion si n x10: 20
Razonamiento: Por cada venta se hace una visita y una comparacion al ser 20 ventas seria 20 operaciones

Funcion: primeraVenta
Mi prediccion si n x10: 1
Razonamiento: Porque solo toma la primera venta, por lo cual solo seria 1 operacion

Resultados:
Funcion: totalVendido
Resultado si n x10: 10

Funcion: totalVendido
Resultado si n x10: 20

Funcion: totalVendido
Resultado si n x10: 20

Funcion: totalVendido
Resultado si n x10: 1

Factor = operaciones con el n más grande ÷ operaciones con el n anterior

Funcion: totalVendidoI

|Paso de tamaño |Operaciones antes|Operaciones despues|Factor|
|---------------|-----------------|-------------------|------|
|100->1.000     |100              |1.000              |10    |
|1.000->10.000  |1.000            |10.000             |10    |
|10.000->100.000|10.000           |100.000            |10    |

Funcion: ventaMayorI

|Paso de tamaño |Operaciones antes|Operaciones despues|Factor|
|---------------|-----------------|-------------------|------|
|100->1.000     |200              |2.000              |10    |
|1.000->10.000  |2.000            |20.000             |10    |
|10.000->100.000|20.000           |200.000            |10    |

Funcion: totalPorCiudadI

|Paso de tamaño |Operaciones antes|Operaciones despues|Factor|
|---------------|-----------------|-------------------|------|
|100->1.000     |200              |2.000              |10    |
|1.000->10.000  |2.000            |20.000             |10    |
|10.000->100.000|20.000           |200.000            |10    |

Funcion: primeraVentaI

|Paso de tamaño |Operaciones antes|Operaciones despues|Factor|
|---------------|-----------------|-------------------|------|
|100->1.000     |1                |1                  |1     |    
|1.000->10.000  |1                |1                  |1     |
|10.000->100.000|1                |1                  |1     |

## Clasificacion Big O
totalVendidoI: O(n). Codigo: un solo for...of sobre las ventas, sin ciclos anidados. Numeros: factor 10 en los tres pasos.
ventaMayorI: O(n). Codigo: un solo ciclo. Numeros: factor 10 en los tres pasos. Hace 2n operaciones en lugar de n, pero Big O ignora la constante: el crecimiento es igual.
totalPorCiudadI: O(n). Codigo: un solo ciclo. La busqueda en el diccionario se tomo como una operacion constante. Numeros: factor 10 en los tres pasos.
primeraVentaI: O(1). Codigo: un acceso por índice, sin ciclo. Numeros: siempre 1 operacion, factor 1.

## Cómo reconoceria un O(n²)
Habria un ciclo sobre los datos dentro de otro ciclo sobre los datos (por ejemplo, comparar cada venta con todas las demas). Al multiplicar n por 10, las operaciones se multiplicarian por 100, y el factor de la tabla estaria cerca de 100. Ninguna de mis funciones lo es.

Dia 6 (23/11/2026)
Cuando i = 0, j va de 1 a 4: son 4 comparaciones.
Cuando i = 1, j va de 2 a 4: son 3 comparaciones.
Cuando i = 2, j va de 3 a 4: son 2 comparaciones.
cuando i = 3, j va de 4 a 4: es 1 comparacion.

Generalizacion:
comparaciones = n * (n - 1) / 2

| n      | tiempo (ms) | factor vs. el anterior |
|--------|-------------|------------------------|
| 1.000  | 4,418ms     | -                      |
| 2.000  | 12,573ms    | 2.8458ms               |
| 4.000  | 43,135ms    | 3.4307ms               |
| 8.000  | 195,354ms   | 4.5288ms               |
| 16.000 | 790,651ms   | 4.0472ms               |

Cuando n se duplica, el tiempo se multiplica por alrededor de 4.5
Lo ideal es 4, en mis resultados varia por el ruido, varian bastante por los procesos externos a javascript
¿Por que 4?: Porque el trabajo crece con n², y (2n)² = 4n²
Metodo: tiempo = c x n²
c = 790.651 / (16.000)²
c = 3.0884

16.000 a 100.000, n se multiplica por 6,25, asi que el tiempo se multiplica por 6,25² = 39,06. Si se pasa a 1.000.000, n se multiplica por 62,5 y el tiempo por 62,5² = 3.906,25:

n = 100.000
790 × 39,06 = 30.857,4ms = 30,8s

n = 1.000.000
790 × 3.906,25 = 3.085.937,5 = 51m

Resultado de n = 100.000
37,029s
Dif = 6,229s
Se ejecuto porque la estimacion es menor a 2minutos (120.000ms)

Costo oculto de include
include actua como un for, basicamente otro ciclo que busca lo que necesita en el arreglo completo
El peso que tenga depende de la cantidad de clientes iguales, con datos tipicos no pesa casi ya que los clientes varian mucho, en el peor caso real requiere una distribucion de datos muy especifica de muchos clientes repetidos y uno muy frecuente que entra a la lista al final, sumando un tercer nivel de recorrido

Conclusion para la gerencia

El reporte de clientes recurrentes se vuelve lento porque, para saber si un cliente compro mas de una vez, el programa compara cada venta contra todas las ventas que vienen despues. Es como revisar una pila de recibos tomando cada uno y comparandolo con todos los demas.

Con pocas ventas esto es rapido. Pero el trabajo no crece en proporcion: si el numero de ventas se duplica, el tiempo se multiplica por cuatro. En nuestras pruebas, 16.000 ventas tardaron 790,651 milisegundos; con el historial anual estimamos que tardaria 51 minutos.

Esto no es un fallo del equipo, es la forma en que esta construido elcalculo. Se puede arreglar cambiando el metodo: en lugar de comparar cada venta con todas, el programa puede llevar una libreta con la cuenta de compras por cliente y revisar las ventas una sola vez. Con ese cambio, el reporte tardaria segundos en lugar de minutos.

Dia 7 (24/11/2026)

| Preguntas       | Cadena                       | Una pasada |
|-----------------|------------------------------|------------|
| Recorridos      | 4                            | 1          |
| Arreglos nuevos | 3 (los de map, filter y map) | 0          |
| Tiempo          | O(n)                         | O(n)       |
| Espacio extra   | O(n)                         | O(1)       |

Porque O(4n) es O(n)
Big O mide cuanto crece, no cuanto vale. Una funcion que hace 4n operaciones y otra que hace n crecen igual de rapido, al multiplicar n por 10 ambas se multiplican por 10.
Se eliminan las constantes multiplicativas, el 4 no cambia la forma de la curva, solo la inclina.
Recorrer cuatro veces una lista de 1.000 nombres son 4.000 pasos y recorrerla una vez son 1.000, la primera es mas lenta, pero si la lista pasa a 10.000 nombres, ambas pasan a ser 10 veces mas lentas

| Si la funcion                                             | Espacio                              |
|-----------------------------------------------------------|--------------------------------------|
| Solo usa contadores, acumuladores o una variable          | O(1)                                 |
| Crea un arreglo con tantos elementos como ventas (o casi) | O(n)                                 |
| Crea un diccionario con una clave por grupo               | O(g), donde g es el numero de grupos |

VentaMayor:
La venta se guarda en una variable, no copia la venta guardada, guarda una referencia O(1)

totalPorCiudad y unidadesPorProducto:
Crean un diccionario, pero su tamaño depende de cuantas ciudades o productos distintos hay, no de cuantas ventas, con 4 ciudades son 4 claves, sin importar si hay 12 o 100.000 ventas

topProductosPorValor:
Crea varias cosas, el diccionario por producto, el arreglo que sale de object.entries (con un par por producto), y el resultado final de slice, todas dependen del numero de productos distintos, no de n.

ventasDelDia:
Crea un arreglo con las ventas de ese dia: O(m), donde m es el numero de ventas del dia, hasta n en el peor caso

clientesRecurrentes:
Crea el arreglo recurrentes, que guarda a cada cliente repetido una sola vez: O(r), con r hasta n/2 en el peor caso

generarVentas:
Crea n objetos: O(n), pero es esperado, porque su trabajo es producir esos datos

totalVendidoM y unidadesVendidasM:
Con solo reduce son O(1)

ventasPorCiudad:
Con reduce y filter crea un arreglo y es O(n)

Las instrumentadas tienen el mismo espacio que las originales, mas un contador fijo

Elijo totalCiudadCadena, pero voy a dejar a totalCiudadPasada para referencia
Porque?
Mayormente por su legibilidad: cada etapa dice que hace: normalizar, filtrar, calcular, sumar
Es declarativa: describe el resultado, no los pasos
Se modifica facil: agregar una etapa es agregar una linea

Revisor: Jose Daniel Rodelo

Observacion: El revisor al mirar el documento, no le salio ninguna duda, no encontra iconsistencias, o algun detalle a aclar o mejorar, en general, todas las tabalas estan bien estructuradas, todo esta bien ordenado y la informacion es clara y facil de leer.

Mi respuesta: (Aceptada) Le pregunte si de verdad habia revisado todo, pregunte por algunas cosas que me explicara de lo que acabo de leer, como "¿Es claro el porque en la tabla de clasificacion de funciones algunas se miden en ms y otras en ops?", y lo respondio sin dudar, no cambie nada ya que el documento esta correcto y es facil de leer y entender para el que no ha visto el codigo.

Dia 8 (25/11/2026)
Entender:
Recibe el arreglo de las ventas (ventas) por ejemplo el ya establecido (datos.js) o el nuevo generado por generarVentas.
Devuelve los clientes recurrentes, osea los clientes con mas de una compra
Las restricciones es que debe de demorar menos de 1s con 100.000 ventas, usando Set y Map, sin alterar los datos originales.

Ejemplos (incluyendo casos borde):
-En una muestra normal(con clientes que se repiten y que no) Devuelve correctamente los cientes recurrentes (que han comprado mas de 1 vez) en 407,202ms
-Un solo elemento ([ventas[0]]) No hay clientes recurrentes, ninguno compro mas de una vez, demoro 4,417ms
-Arreglo vacio ([]) No hay clientes recurrentes, ninguno compro mas de una vez, demoro 0.138ms
-Todas las ventas del mismo cliente: Aparece ese cliente una sola vez
-Un cliente con 3 compras: Aparece una sola vez no dos
-Los 12 datos originales: C01, C02, C03

Fuerza bruta:
Dos ciclos, compara cada venta con las siguientes. Complejidad: O(n²) en tiempo, con O(n-1)/2 comparaciones, mas el includes escondido. Memoria: O(r), r recurrentes

Optimizacion:
Se busca varias veces el mismo cliente, la idea: Con un set, "si este cliente ya estaba en los vistos, es recurrente". Con un Map, "cuento las compras de cada cliente y al final me quedo con los que tienen mas de una"

Implementar:
Implementado en: analitica.js
Comprobado en: medirTiempo.js

| n       | Original (ms) | Set (ms)     | Map (ms) |
|---------|---------------|--------------|----------|
| 1.000   | 6,173ms       | Menos de 1ms | 1,174ms  |
| 10.000  | 407,202ms     | 4,084ms      | 2,634ms  |
| 100.000 | 1.03mins      | 38,657ms     | 26,286ms |

Lo que se gana: El tiempo pasa de O(n^2) a O(n).
Lo que se paga: La memoria pasa de O(r) a O(c), con c clientes distintos. La original solo guardaba los recurrentes, y la nueva tambien guarda los vistos (Set) o todos los contadores (Map). Cons los datos generados hay hasta 33.000 clientes distintos con 100.000 ventas, es memoria pero poca
Porque el trato conviene: El tiempo era el mayor factor que afectaba el rendimiento, y la memoria extra es pequeña frente a eso. En un servidor con memoria limitada, conviene verificarlo, pero la libreta es de tamaño proporcional a los clientes, no a las ventas.
Matiz: O(1) en has y get es promedio, una tabla hash tiene costos propios (espacio extra por entrada, crecimiento interno). Y la ventaja se nota con volumenes grandes: con 12 ventas la original no es peor