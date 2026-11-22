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