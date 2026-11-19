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

|Vuelta|Candidato actual|Valor venta|Operacion|
|------|----------------|-----------|---------|
|inicio|null            |0          |
|1     |id = 1          |84000      |
|2     |id = 1          |26000      |
|3     |id = 3          |95000      |
|4     |id = 3          |95000      |
|5     |id = 5          |135000     |
|6     |id = 5          |135000     |
|7     |id = 5          |135000     |
|8     |id = 5          |135000     |
|9     |id = 5          |135000     |
|10    |id = 10         |168000     |
|11    |id = 10         |168000     |
|12    |id = 10         |168000     |