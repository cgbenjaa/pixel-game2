# Pixel Game — Evaluación Parcial 2

Tienda de videojuegos desarrollada con React, JavaScript y Bootstrap. Esta versión toma como base el proyecto Pixel Game de la primera entrega y agrega navegación, catálogo filtrable, categorías, ofertas, carrito, checkout simulado, resultados de compra, registro y administración de productos.

## Requisitos

- Node.js y npm instalados.
- Navegador moderno.
- Conexión a internet para descargar las dependencias con npm. Bootstrap se instala como dependencia local; la fuente tipográfica de Google es opcional.

## Instalación y ejecución

Desde la carpeta del proyecto:

```bash
npm install
npm start
```

La aplicación se abrirá en `http://localhost:3000`.

## API simulada con json-server

Se agregó una API simulada siguiendo el ejemplo `hola-mundo` y la carpeta `fake-api` entregada en clases. El frontend intenta cargar y modificar productos mediante `fetch` en `src/data/api.js`. Si la API no está ejecutándose, la aplicación conserva el modo local con `src/data/productos.js` y `localStorage`.

### Iniciar el proyecto

1. Abre una terminal dentro de la carpeta `api`.
2. Ejecuta `npm install` (solo la primera vez).
3. Ejecuta `npm start`. La API estará disponible en `http://localhost:4000/products`.
4. Abre una segunda terminal en la carpeta principal `pixel-game-evaluacion2`.
5. Ejecuta `npm install` (solo la primera vez) y luego `npm start`.

Deja ambas terminales abiertas mientras pruebas la conexión. Si solo inicias React, la tienda seguirá funcionando con el modo local, pero no se sincronizará con la API. La API usa `db.json` y no representa una base de datos de producción.

## Pruebas unitarias

La pauta solicita Jasmine y Karma. Esta entrega incluye una configuración separada para ejecutar pruebas con Jasmine/Karma:

```bash
npm run test:karma
```

El navegador Chrome/Chromium debe estar disponible para Karma. También se conserva el comando `npm test` de Create React App para la prueba básica de integración.

## Funcionalidades incluidas

- Componentes React reutilizables con props y estado.
- Catálogo, búsqueda, filtro por categoría y ofertas.
- Detalle de producto y carrito con cantidades.
- Checkout con validación de campos y resultado de pago simulado correcto o rechazado.
- Registro con validación básica de correo, contraseña y RUT chileno.
- Panel de administración con operaciones CRUD de productos.
- Persistencia simulada en `localStorage`.
- Diseño responsivo usando clases de Bootstrap y CSS propio.

## Límites de la demostración

No existe backend, base de datos remota, autenticación segura ni procesamiento real de pagos. Los datos de registro, pedidos, carrito y productos quedan en el almacenamiento local del navegador.

## Estructura

- `src/App.js`: vistas y flujo general.
- `src/components/`: componentes de interfaz.
- `src/data/productos.js`: datos iniciales, persistencia simulada, CRUD, filtros y validadores.
- `src/tests/`: pruebas Jasmine.
- `karma.conf.cjs`: configuración de Karma.
- `docs/`: ERS v2, cobertura de testing y guía de presentación.
