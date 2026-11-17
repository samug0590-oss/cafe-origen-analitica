Dia 1 (11/17/2026)

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