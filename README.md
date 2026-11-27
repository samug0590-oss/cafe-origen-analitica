# Analitica Cafe Origen v1.0

Motor de analitica de ventas para Cafe Origen. Lee el historial de ventas (los 12 registros reales de muestra o n ventas generadas al azar) y muestra por consola un reporte de negocio: totales, ciudades, productos, clientes recurrentes, producto estrella por ciudad, combo de regalo, cliente para cupon y mejor semana de ventas.

Esta pensado para ejecutarse con un solo comando, sin abrir el codigo, y para responder en menos de cinco segundos con 100.000 ventas.

## Requisitos

- Node.js (version LTS). Para comprobarlo: `node --version`
- Git, solo si vas a descargar el proyecto

## Como ejecutarlo

Descarga el proyecto y entra a la carpeta:

```
git clone https://github.com/samug0590-oss/cafe-origen-analitica.git
cd cafe-origen-analitica
```

Reporte con los datos reales de muestra (12 ventas):

```
node src/reporte.js
```

Reporte con n ventas generadas al azar, por ejemplo 100.000:

```
node src/reporte.js 100000
```

Otros comandos:

```
node src/verificar.js   # comprueba que cada version con metodos coincide con la version con ciclo
node src/comparar.js    # compara el rendimiento de la v0.1 contra la v1.0
node src/medir.js       # cuenta las operaciones de varias funciones al crecer los datos
```

Al ejecutar `node src/reporte.js` veras nueve secciones y los tiempos al final. No necesitas instalar nada mas.

## Que preguntas responde

- Cuanto se vendio en total y cuantas unidades salieron?
- Cual fue la venta mas grande?
- Cuanto gasta en promedio un cliente por compra (ticket promedio)?
- Cuanto se vendio en cada ciudad?
- Cuantas unidades se vendieron de cada producto?
- Cuales son los tres productos que mas dinero generaron?
- Que clientes compraron mas de una vez?
- Cual es el producto estrella de cada ciudad?
- Que dos productos suman exactamente el valor de una tarjeta de regalo?
- Quien es el primer cliente que compro una sola vez (para enviarle un cupon)?
- Cual fue la mejor semana de ventas del mes?
- Como le fue a un dia en particular, incluso si no hubo ventas?

## Estructura del proyecto

```
cafe-origen-analitica/
├── README.md          Documentacion del producto
├── RENDIMIENTO.md     Complejidad, mediciones y comparacion v0.1 contra v1.0
├── bitacora.md        Decisiones, trazas, mediciones y depuracion de la construccion
└── src/
    ├── datos.js           Las 12 ventas de muestra, tal como vinieron (con sus errores)
    ├── catalogo.js        Catalogo de 8 productos con su precio
    ├── ventasDiarias.js   Totales diarios de septiembre, en miles de pesos
    ├── analitica.js       Todas las funciones de calculo
    ├── generador.js       Generador de ventas al azar
    ├── reporte.js         Reporte final por consola
    ├── verificar.js       Comparacion ciclo contra metodos
    ├── medir.js           Contador de operaciones
    ├── comparar.js        Comparacion de rendimiento v0.1 contra v1.0
    └── probar*.js         Pruebas manuales de cada minireto
```

## Decisiones de diseno

- **Los datos no se limpian en el archivo.** `datos.js` conserva los errores de la muestra (por ejemplo una ciudad escrita en minuscula y con un espacio sobrante); la limpieza se hace al calcular, normalizando con `trim()` y `toLowerCase()`.
- **Las funciones son puras.** Reciben los datos por parametro, no usan variables globales y no imprimen; solo `reporte.js` muestra resultados.
- **Los casos vacios no fallan.** Sin datos, los totales dan 0 y los indicadores sin sentido (ticket promedio, venta mayor) devuelven `null`, que el reporte muestra como "sin datos".
- **Ninguna funcion del reporte es O(n^2).** Los clientes recurrentes pasaron de dos ciclos anidados a un Set, y los analisis nuevos usan Map, ventana deslizante y dos punteros. El detalle esta en `RENDIMIENTO.md`.

## Version

v1.0. Historial de versiones: v0.1 (primer reporte), v0.2 (informe de rendimiento), v1.0 (optimizaciones integradas).