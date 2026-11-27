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

Inicio del uso de I.A, Claude, Motivo: Falta de tiempo para los entregables Algoritmia Semana 2 Dia 2
## Minireto 10: combos de regalo y frecuencias

### 1. Catalogo
src/catalogo.js representa el catalogo como un arreglo de 8 objetos con las propiedades nombre y precio, en el orden del enunciado. Los precios son numeros sin puntos. Se exporta con module.exports.

### 2. comboRegaloFuerzaBruta (referencia)
Idea: dos ciclos. El de afuera elige un producto y el de adentro recorre solo los siguientes (el segundo indice arranca en i + 1). Asi cada par se prueba una sola vez y nunca se empareja un producto consigo mismo.
Que devuelve: un arreglo con los dos productos, o null si ninguna pareja suma el valor.
Complejidad: tiempo O(n^2), espacio O(1).
Justificacion: hay dos ciclos anidados sobre el catalogo y se prueban n(n-1)/2 pares; solo usa indices, sin estructuras extra.

### 3. comboRegalo (optimizada con Map)
Idea: para cada producto, el complemento es valor - precio. Se recorre el catalogo una sola vez con un Map que guarda los precios ya vistos (clave: precio, valor: producto). Si el complemento ya esta como clave, esa es la pareja; si no, se guarda el precio actual y se sigue.
Detalle clave: la pregunta por el complemento se hace ANTES de guardar el producto actual. Si se guardara primero, con 84.000 el producto de 42.000 se encontraria a si mismo y devolveria el mismo producto dos veces.
Que devuelve: un arreglo con el producto que estaba guardado y el actual, o null si el ciclo termina sin pareja.
Complejidad: tiempo O(n), espacio O(n).
Justificacion: un solo for...of; has, get y set cuestan O(1) por vuelta; el Map puede llegar a guardar todos los precios del catalogo. Es el mismo intercambio del Minireto 9: se paga memoria para ganar tiempo.
Limitacion conocida: si dos productos distintos tuvieran el mismo precio, el Map conservaria solo el ultimo. No ocurre con este catalogo.

### 4. Pruebas y casos borde

| Valor                             | Fuerza bruta                             | Optimizada |
|-----------------------------------|------------------------------------------|------------|
| 87.000                            | Origen Huila 500 g + Origen Sierra 500 g | igual      |
| 61.000                            | Origen Narino 250 g + Taza de ceramica   | igual      |
| 10.000 (menor que cualquier suma) | null                                     | null       |
| 100.000 (ningun par suma eso)     | null                                     | null       |
| 84.000 (doble de 42.000)          | null                                     | null       |
| 0                                 | null                                     | null       |

| Caso borde                                  | Resultado | Por que                                                                     |
|---------------------------------------------|-----------|-----------------------------------------------------------------------------|
| Catalogo vacio                              | null      | el ciclo no da ninguna vuelta                                               |
| Catalogo con un solo producto               | null      | no hay con quien emparejarlo                                                |
| Valor que es el doble de un precio (84.000) | null      | los dos productos deben ser distintos; por eso se pregunta antes de guardar |
| Valor 0 o negativo                          | null      | el complemento seria negativo y ningun precio lo cumple                     |

Las dos versiones coinciden en todos los valores probados. Con este catalogo, 87.000 y 61.000 tienen una sola pareja posible, asi que ambas devuelven exactamente la misma.

### 5. Traza de la version optimizada para 87.000

| Vuelta | Producto            | Precio | Complemento (87.000 - precio) | Esta en el Map?         | Accion                        | Map despues (precios) |
|--------|---------------------|--------|-------------------------------|-------------------------|-------------------------------|-----------------------|
| 1      | Origen Narino 250 g | 26.000 | 61.000                        | No                      | guardar el precio             | 26.000                |
| 2      | Origen Huila 500 g  | 42.000 | 45.000                        | No                      | guardar el precio             | 26.000, 42.000        |
| 3      | Origen Sierra 500 g | 45.000 | 42.000                        | Si (Origen Huila 500 g) | devolver la pareja y terminar | 26.000, 42.000        |

Resultado: Origen Huila 500 g + Origen Sierra 500 g (42.000 + 45.000 = 87.000). Solo se visitaron 3 de los 8 productos y el catalogo se recorre una sola vez como maximo, en lugar de probar hasta 28 pares.

### 6. productoEstrellaPorCiudad
Decision de conteo: se cuentan apariciones en las ventas (cada venta suma 1), no unidades vendidas.
Normalizacion: la ciudad se compara con trim y toLowerCase, asi "medellin " (venta 5) cae en el mismo grupo que "Medellin". Las claves del resultado quedan en minuscula.
Estructura: un Map de Maps. El exterior va de ciudad a un Map interior, y el interior va de producto a cantidad de apariciones. Primero se cuenta; despues se recorre cada Map interior eligiendo el producto con la cuenta mas alta.
Regla de desempate: gana el producto que aparecio primero en las ventas de esa ciudad. Se cumple porque el Map conserva el orden de insercion y la comparacion es estricta (mayor que, no mayor o igual), de modo que un empate nunca reemplaza al primero.
Arreglo vacio: devuelve un objeto vacio, sin error.

| Ciudad   | Conteo de productos                                                  | Producto estrella                              |
|----------|----------------------------------------------------------------------|------------------------------------------------|
| Medellin | Huila 500 g: 2, Sierra 500 g: 1, Prensa francesa: 1                  | Origen Huila 500 g                             |
| Bogota   | Narino 250 g: 3, Molino manual: 1                                    | Origen Narino 250 g                            |
| Cali     | Prensa francesa: 1, Huila 500 g: 1, Sierra 500 g: 1 (empate de tres) | Prensa francesa (primero en aparecer, venta 3) |
| Pereira  | Huila 500 g: 1                                                       | Origen Huila 500 g                             |

Complejidad: tiempo O(n), espacio O(c x p).
Justificacion: un recorrido de las ventas con operaciones O(1) por vuelta, y luego un recorrido de los Maps cuyo total de entradas nunca supera n (no es O(n^2) aunque haya Maps anidados). La memoria depende de las ciudades (c) y los productos distintos (p), y en el peor caso llega a O(n).

### 7. primerClienteUnico
Por que dos recorridos: para saber si un cliente aparece una sola vez hay que haber visto todas las ventas, porque podria reaparecer al final. Primer recorrido: contar las compras de cada cliente con comprasPorCliente (Minireto 9), reutilizada. Segundo recorrido: recorrer las ventas en su orden original y devolver el primer cliente con cuenta exactamente 1.
Por que el segundo recorrido es sobre las ventas y no sobre el Map: el enunciado pide "el primero en orden de las ventas".
Que devuelve: el cliente, o null si no hay ninguno o el arreglo esta vacio.

| Entrada                    | Resultado   |
|----------------------------|-------------|
| Los 12 datos del Dia 1     | C04         |
| []                         | null        |
| Todos los clientes repiten | null        |
| Una sola venta             | ese cliente |

Verificacion a mano con los 12 datos: las ventas 1 a 4 son de C01, C02, C03 y C01, y los tres aparecen mas de una vez. La venta 5 es de C04, que aparece una sola vez, asi que se devuelve C04.
Complejidad: tiempo O(n), espacio O(c).
Justificacion: dos recorridos de n elementos suman 2n, y Big O elimina la constante, asi que es O(n). El Map guarda un conteo por cliente distinto.

### 8. Clasificacion de complejidad

| Funcion                   | Tiempo | Espacio  | Justificacion                                                                   |
|---------------------------|--------|----------|---------------------------------------------------------------------------------|
| comboRegaloFuerzaBruta    | O(n^2) | O(1)     | dos ciclos anidados sobre el catalogo; n(n-1)/2 pares; solo usa indices         |
| comboRegalo (Map)         | O(n)   | O(n)     | un solo ciclo con has, get y set en O(1); el Map guarda los precios vistos      |
| productoEstrellaPorCiudad | O(n)   | O(c x p) | un recorrido de las ventas y otro de los Maps con a lo sumo n entradas en total |
| primerClienteUnico        | O(n)   | O(c)     | dos recorridos (2n = O(n)) y un Map con los clientes distintos                  |

Conclusion: las tres funciones pedidas son O(n) en tiempo. La unica cuadratica es la fuerza bruta de los combos, que sirve de referencia para comprobar la correccion de la version con Map. En los tres casos el patron es el mismo del Minireto 9: se cambia una busqueda lenta por una consulta O(1) en un Map, a cambio de memoria proporcional a los datos distintos.

## Minireto 11: la mejor racha y el presupuesto exacto

### 1. Datos
Los totales diarios de septiembre (30 dias, en miles de pesos) estan en src/ventasDiarias.js. El catalogo de productos es el de src/catalogo.js (Minireto 10).

### 2. mejorSemanaBruta (referencia)
Idea: para cada posible inicio, suma los k dias del bloque desde cero y se queda con el mayor total.
Que devuelve: un objeto con el total y el dia de inicio (1 = primer dia del arreglo), o null si no cabe ninguna ventana.
Complejidad: tiempo O(n x k), espacio O(1).
Justificacion: hay n - k + 1 ventanas y cada una se suma con un ciclo de k pasos. Si k es fijo (7), es lineal en la practica, pero cuando k crece con los datos (por ejemplo k = n / 2) se acerca a O(n^2). Se suman muchas veces los mismos dias.

### 3. mejorSemana (ventana deslizante)
Idea: se calcula la primera ventana una sola vez. Para pasar a la siguiente, se suma el dia que entra y se resta el que sale, en lugar de volver a sumar los k dias.
Que devuelve: igual que la bruta: { total, inicio }.
Complejidad: tiempo O(n), espacio O(1).
Justificacion: la primera ventana cuesta k pasos y despues cada dia entra una vez y sale una vez, con una suma y una resta por vuelta. El costo no depende de k. Solo usa unas pocas variables (suma, mejorTotal, mejorInicio).
Desempate: si dos semanas suman lo mismo, gana la primera, porque la comparacion es estricta (mayor que). La bruta usa la misma regla, por eso coinciden siempre.
Detalle cuidadoso: el ultimo dia (indice n - 1) debe entrar a la ventana, o se pierde la ultima semana. En septiembre la mejor semana es justamente la ultima.

### 4. Las tres primeras posiciones de la ventana (k = 7)

Dias:  1    2    3    4    5    6    7    8    9    10
       320  410  280  390  510  620  700  300  290  450

Posicion 1: dias 1 a 7  -> [320 410 280 390 510 620 700] = 3.230
Posicion 2: dias 2 a 8  -> sale 320, entra 300  -> 3.230 - 320 + 300 = 3.210
Posicion 3: dias 3 a 9  -> sale 410, entra 290  -> 3.210 - 410 + 290 = 3.090

| Posicion | Dias  | Sale | Entra | Total |
|----------|-------|------|-------|-------|
| 1        | 1 a 7 | -    | -     | 3.230 |
| 2        | 2 a 8 | 320  | 300   | 3.210 |
| 3        | 3 a 9 | 410  | 290   | 3.090 |

### 5. Resultado para septiembre
La mejor semana de septiembre es la que inicia el dia 24 (del 24 al 30), con un total de 3.670 miles de pesos ($3.670.000). Las dos versiones devuelven exactamente el mismo resultado. Comprobado a mano: 440 + 500 + 590 + 650 + 720 + 400 + 370 = 3.670.
Casos borde (devuelven null las dos versiones): k mayor que el numero de dias, k igual a 0 o negativo, y arreglo de dias vacio. Con k = 1 el resultado es el mejor dia (720, el dia 28) y con k = 30 la ventana es todo el mes (14.460, dia 1).

### 6. Comparacion con 100.000 dias al azar
Se generaron 100.000 dias con valores entre 200 y 800. Ambas versiones devolvieron el mismo total y el mismo dia de inicio.

| k    | Fuerza bruta (ms)                | Ventana deslizante (ms)          |
|------|----------------------------------|----------------------------------|
| 7    | (copia el tiempo de tu terminal) | (copia el tiempo de tu terminal) |
| 1000 | (copia el tiempo de tu terminal) | (copia el tiempo de tu terminal) |

Analisis: con k = 7 la diferencia es pequena porque 7 es una constante. Con k = 1000 la fuerza bruta hace unos 100 millones de sumas (100.000 x 1.000) mientras que la ventana sigue haciendo unas 100.000 operaciones, y el tiempo de la bruta crece con k mientras el de la ventana casi no cambia. Esto confirma O(n x k) contra O(n).

### 7. parMasCercano (dos punteros)
Idea: se ordena una copia del catalogo por precio de menor a mayor (sort con funcion de comparacion numerica, sin alterar el catalogo original) y se ponen dos punteros, uno en el extremo izquierdo (el mas barato) y otro en el derecho (el mas caro). Mientras izquierdo < derecho se suman los dos precios:
- Si la suma supera el presupuesto, el producto de la derecha es demasiado caro incluso emparejado con el mas barato que queda; se descarta y el puntero derecho retrocede.
- Si la suma cabe, se guarda como mejor si supera a la mejor anterior, y el puntero izquierdo avanza: con ese producto de la izquierda ya no hay una pareja mejor (cualquier otro producto a la derecha seria mas barato) y se prueba uno mas caro.
Que devuelve: un arreglo con los dos productos, o null si ninguna pareja cabe en el presupuesto.
Casos borde: catalogo con menos de 2 productos, presupuesto insuficiente y presupuesto 0 o negativo devuelven null.

Pruebas:
| Presupuesto | Resultado                                 | Suma                                                    |
|-------------|-------------------------------------------|---------------------------------------------------------|
| 100.000     | Filtros de papel x100 + Origen Huila 1 kg | 97.000                                                  |
| 140.000     | Origen Sierra 500 g + Prensa francesa     | 140.000 (exacto)                                        |
| 40.000      | null                                      | la pareja mas barata (18.000 + 26.000) ya cuesta 44.000 |

Se comparo con una fuerza bruta (todos los pares) para presupuestos de 0 a 250.000 en saltos de 500 y las sumas coincidieron en todos.

### 8. Traza de los punteros para 100.000
Catalogo ordenado por precio: indice 0 Filtros (18.000), 1 Narino 250 g (26.000), 2 Taza (35.000), 3 Huila 500 g (42.000), 4 Sierra 500 g (45.000), 5 Huila 1 kg (79.000), 6 Prensa (95.000), 7 Molino (120.000).

| Paso | Izq        | Der         | Suma    | Comparacion con 100.000  | Que se hace y por que                                                                                   | Mejor hasta ahora |
|------|------------|-------------|---------|--------------------------|---------------------------------------------------------------------------------------------------------|-------------------|
| 1    | 0 (18.000) | 7 (120.000) | 138.000 | se pasa                  | el Molino no cabe ni con el mas barato: se descarta, der baja                                           | ninguna           |
| 2    | 0 (18.000) | 6 (95.000)  | 113.000 | se pasa                  | la Prensa tampoco cabe con el mas barato: der baja                                                      | ninguna           |
| 3    | 0 (18.000) | 5 (79.000)  | 97.000  | cabe                     | se guarda como mejor; los filtros ya no pueden mejorar con nadie mas barato que el Huila 1 kg: izq sube | 97.000            |
| 4    | 1 (26.000) | 5 (79.000)  | 105.000 | se pasa                  | el Huila 1 kg no cabe con el Narino: der baja                                                           | 97.000            |
| 5    | 1 (26.000) | 4 (45.000)  | 71.000  | cabe                     | no supera 97.000: izq sube                                                                              | 97.000            |
| 6    | 2 (35.000) | 4 (45.000)  | 80.000  | cabe                     | no supera 97.000: izq sube                                                                              | 97.000            |
| 7    | 3 (42.000) | 4 (45.000)  | 87.000  | cabe                     | no supera 97.000: izq sube                                                                              | 97.000            |
| 8    | 4          | 4           | -       | los punteros se cruzaron | termina                                                                                                 | 97.000            |

Resultado: Filtros de papel x100 + Origen Huila 1 kg = 97.000, sin superar 100.000. En total los punteros hicieron 7 sumas (como maximo n - 1), cada uno movido por una razon: der baja cuando la suma se pasa y izq sube cuando la suma cabe.

### 9. Clasificacion de complejidad

| Funcion          | Tiempo     | Espacio | Justificacion                                                                                                                                                    |
|------------------|------------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| mejorSemanaBruta | O(n x k)   | O(1)    | un ciclo de ventanas y dentro otro de k sumas; solo usa acumuladores                                                                                             |
| mejorSemana      | O(n)       | O(1)    | un solo recorrido: cada dia entra y sale una vez, con una suma y una resta; no depende de k                                                                      |
| parMasCercano    | O(n log n) | O(n)    | ordenar domina: sort cuesta O(n log n) y la fase de dos punteros solo O(n) (cada vuelta mueve un puntero, a lo sumo n - 1 vueltas); la copia ordenada ocupa O(n) |

Conclusion: la ventana deslizante evita recalcular lo que no cambia, y los dos punteros aprovechan que los datos estan ordenados para descartar candidatos sin probar todos los pares (el equivalente por fuerza bruta seria O(n^2)). El costo de ordenar es lo que hace que parMasCercano sea O(n log n) y no O(n); si el catalogo llegara ya ordenado, bastaria O(n).

## Minireto 12: Analitica v1.0, lanzamiento

### 1. Que se hizo
- src/reporte.js se reescribio para usar solo funciones optimizadas. Cada seccion es una funcion pequena que imprime lo que calculan las funciones de analitica.js, y el reporte no calcula nada por su cuenta.
- Secciones nuevas: clientes recurrentes (con Set), producto estrella por ciudad, combo de regalo para una tarjeta de 87.000, cliente para cupon (primer cliente de una sola compra) y mejor semana.
- node src/reporte.js usa los 12 datos reales; node src/reporte.js n genera n ventas al azar. El parametro se lee con process.argv[2]; si no es un entero positivo, el programa explica como se usa y termina.
- src/comparar.js mide el tiempo de calculo del reporte v0.1 y del v1.0. README.md y RENDIMIENTO.md se actualizaron.

### 2. Decisiones de diseno
- Parametro opcional: sin argumento se usan los datos reales, porque son la referencia de correccion.
- Clientes recurrentes: el reporte muestra la cantidad y 5 ejemplos. Con 100.000 ventas hay miles de clientes recurrentes y listarlos todos no le sirve a la gerente.
- Mejor semana: el generador solo produce 6 fechas distintas, asi que una semana de 7 dias no cabe en los datos generados. La seccion usa los totales diarios de septiembre del Minireto 11 (src/ventasDiarias.js) y lo indica en el reporte.
- Linea base de la comparacion: la v0.1 se mide con sus secciones originales mas la funcion original de clientes recurrentes, porque esa era la version que la gerente encontro lenta. La v1.0 hace ademas cuatro analisis nuevos y aun asi es mas rapida.
- Estimacion: ejecutar la v0.1 con 100.000 ventas tardaria minutos; se estima multiplicando la medicion con 10.000 por 100 (factor cuadratico) y se marca como estimado. Es un valor minimo, porque el includes del metodo original pesa mas con muchos clientes repetidos.
- Lo medido es el calculo, sin imprimir, para comparar los algoritmos y no la consola.

### 3. Resultados de las pruebas
| Prueba                                         | Resultado                                                                                                                                                                       |
|------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| node src/reporte.js (12 datos)                 | las secciones completas con los valores esperados (total 985.000, 21 unidades, 4 ciudades, top 3, recurrentes C01 C02 C03, cupon C04, mejor semana dias 24 al 30 con 3.670.000) |
| node src/reporte.js 100000                     | todas las secciones; analisis y reporte en (copia el tiempo de tu terminal) ms                                                                                                  |
| node src/reporte.js abc                        | muestra el uso y termina sin error                                                                                                                                              |
| busqueda de NaN, undefined y null en la salida | sin coincidencias en las dos ejecuciones                                                                                                                                        |
| node src/verificar.js                          | todo en OK                                                                                                                                                                      |

### 4. Comparacion v0.1 contra v1.0 (detalle en RENDIMIENTO.md, seccion 8)
(Copia aqui la tabla que muestra node src/comparar.js.)
Conclusion: la v0.1 crece de forma cuadratica por los clientes recurrentes; la v1.0 es lineal. Con 100.000 ventas la v1.0 responde en milisegundos, muy por debajo del limite de un segundo que exige el marketplace.

### 5. Resumen de los 12 minirretos

| MiniReto                            | Que construi                                                                                                | Pieza del producto                 |
|-------------------------------------|-------------------------------------------------------------------------------------------------------------|------------------------------------|
| 1. Primer tueste                    | repositorio, arreglo de 12 ventas, explorar.js, diccionario de datos y casos borde                          | datos.js                           |
| 2. Los numeros del dia              | valorVenta, total, unidades, venta mayor, ticket promedio y ventas por ciudad con ciclos y casos vacios     | indicadores basicos                |
| 3. Del ciclo al metodo              | versiones con map, filter y reduce, verificar.js, agrupaciones y ranking                                    | reportes por ciudad y producto     |
| 4. Analitica v0.1                   | reporte por consola, ventasDelDia, depuracion de los errores de Bogota duplicada y NaN en el ticket, README | primera version entregable         |
| 5. Cuanto cuesta cada reporte       | generador de ventas y contador de operaciones; funciones lineales y una constante                           | herramientas de medicion           |
| 6. El reporte que se volvio lento   | clientes recurrentes con dos ciclos anidados, tiempos con console.time y estimacion de 100.000 y 1.000.000  | diagnostico del cuello de botella  |
| 7. Tiempo, memoria y cadenas        | complejidad espacial; cadena de metodos contra una sola pasada                                              | totalCiudad final                  |
| 8. Analitica v0.2                   | informe RENDIMIENTO.md, proyeccion, riesgos y plan de optimizacion                                          | informe de rendimiento             |
| 9. Clientes recurrentes lineal      | versiones con Set y con Map                                                                                 | recurrentes optimizado             |
| 10. Combos de regalo y frecuencias  | complemento con Map, producto estrella por ciudad y primer cliente unico                                    | analisis comerciales               |
| 11. La mejor racha y el presupuesto | ventana deslizante y dos punteros                                                                           | analisis temporal y de presupuesto |
| 12. Analitica v1.0                  | reporte final integrado, comparacion v0.1 contra v1.0, README de producto                                   | producto final                     |

### 6. Estrategia aplicada en cada optimizacion

| Problema                                        | Fuerza bruta                                                               | Que trabajo se repetia                           | Estrategia                                                                                               | Resultado                                    |
|-------------------------------------------------|----------------------------------------------------------------------------|--------------------------------------------------|----------------------------------------------------------------------------------------------------------|----------------------------------------------|
| totalCiudad (MiniReto 7)                        | cadena de map, filter, map y reduce: 4 recorridos y 3 arreglos intermedios | se creaban arreglos que solo se usaban una vez   | un solo recorrido con acumulador                                                                         | tiempo O(n) en ambas, memoria de O(n) a O(1) |
| Clientes recurrentes (MiniReto 9)               | dos ciclos anidados y includes: O(n^2)                                     | se buscaba muchas veces al mismo cliente         | recordar lo ya visto con Set y Map                                                                       | O(n) en tiempo, memoria O(c)                 |
| Combo de regalo (MiniReto 10)                   | probar todos los pares: O(n^2)                                             | se probaban parejas que no podian sumar el valor | calcular el complemento y buscarlo en un Map de precios vistos                                           | O(n) en tiempo, memoria O(n)                 |
| Producto estrella y cliente unico (MiniReto 10) | contar con ciclos anidados                                                 | se recontaba al buscar                           | conteo de frecuencias con Map (de Maps en el caso de las ciudades); dos recorridos para el cliente unico | O(n)                                         |
| Mejor semana (MiniReto 11)                      | sumar cada bloque de k dias desde cero: O(n x k)                           | se sumaban muchas veces los mismos dias          | ventana deslizante: sumar el que entra y restar el que sale                                              | O(n), no depende de k                        |
| Par mas cercano (MiniReto 11)                   | probar todos los pares: O(n^2)                                             | se probaban parejas sin aprovechar el orden      | ordenar y usar dos punteros desde los extremos                                                           | O(n log n), dominado por ordenar             |

Patron comun: en todos los casos la mejora vino de identificar que informacion se recalculaba y guardarla (Set, Map, suma de la ventana) o de aprovechar una propiedad de los datos (el orden), a cambio de algo de memoria.

### 7. Historial del repositorio
(Pega aqui el resultado de git log --oneline. Debe haber un commit por minireto; si algunos se juntaron en un solo commit, anotalo aqui: no se reescribio el historial.)

### 8. Verificacion de entrega
Se clono el repositorio en una carpeta nueva con git clone y se ejecutaron node src/reporte.js, node src/reporte.js 100000 y node src/verificar.js sin errores.