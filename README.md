# Café Origen — Reporte de Ventas

**Versión:** v0.1

## ¿Qué es el proyecto?

Café Origen es un negocio de café y productos relacionados, y este proyecto es su motor de analítica de ventas. Toma el historial de ventas y genera un reporte por consola para revisar los resultados del negocio.

## ¿Cómo se ejecuta?

### Requisitos

Necesitas tener **Node.js** (versión **LTS**) instalado en tu computador.

Para comprobar si ya lo tienes instalado, abre una terminal (en Windows puedes buscar *Símbolo del sistema* o *PowerShell*; en Mac, *Terminal*) y ejecuta:

```bash
node --version
```

Si aparece un número de versión (por ejemplo, `v20.x.x` o `v22.x.x`), ya cumple con el requisito. Si muestra un error o indica que no se reconoce el comando, instala Node.js versión LTS antes de continuar.

### Pasos

1. Abre una terminal en tu computador.
2. Entra a la carpeta del proyecto usando `cd` y la ruta donde guardaste la carpeta `cafe-origen-analitica`:

```bash
cd ruta/a/cafe-origen-analitica
```

3. Ejecuta el reporte principal:

```bash
node src/reporte.js
```

4. *(Opcional)* Si quieres correr una comprobación técnica de los cálculos, ejecuta:

```bash
node src/verificar.js
```

### Qué deberías ver

Al correr `node src/reporte.js`, verás en la consola un reporte con **cuatro secciones** (*Resumen general*, *Ventas por ciudad*, *Unidades por producto* y *Top 3 productos por valor*) junto con los **dos resúmenes por día** al final.

## ¿Qué preguntas responde?

- ¿Cuánto se vendió en total?
- ¿Cuántas unidades salieron?
- ¿Cuál fue la venta más grande?
- ¿Cuánto gasta en promedio un cliente por compra?
- ¿Cuánto se vendió en cada ciudad?
- ¿Qué productos venden más unidades?
- ¿Cuáles son los tres productos que más dinero generan?
- ¿Cómo le fue a un día específico?

## Nota sobre los datos

`src/datos.js` contiene la muestra de ventas tal como llegó, incluidos sus errores o variaciones (como diferencias de mayúsculas/minúsculas o registros con cantidad `0`). La limpieza y normalización (como quitar espacios, pasar a minúsculas al agrupar o evitar divisiones entre cero) se hace al calcular, sin modificar `src/datos.js`.

## Estructura del proyecto

```text
cafe-origen-analitica/
├── README.md          # Instrucciones de uso para consultar y ejecutar el reporte
├── bitacora.md        # Registro del trabajo, casos borde, pruebas y depuración
└── src/
    ├── datos.js       # Muestra original de ventas con los registros tal como vinieron
    ├── analitica.js   # Funciones que calculan totales, promedios, agrupaciones y ventas por día
    ├── reporte.js     # Script principal que arma y muestra el reporte en consola
    ├── verificar.js   # Comprobación de resultados entre funciones
    ├── depuracion.js  # Pruebas de casos con errores para verificar correcciones
    ├── explorar.js    # Inspección rápida del arreglo de ventas en consola
    └── probar.js      # Pruebas puntuales de las funciones con distintas entradas
```