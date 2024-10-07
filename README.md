# App-Notas Frontend

Este es el frontend de la aplicación App-Notas, desarrollada con Vue 3 y Vite.

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm (normalmente viene con Node.js)

## Instalación

1. Clona el repositorio:
   ```
   git clone https://github.com/pieromarcoz/app-notas.git
   cd app-notas
   ```

2. Instala las dependencias:
   ```
   npm install
   ```
3. Configura la URL del backend:
   
   Abre el archivo `src/config/axios.js` (o donde hayas configurado Axios) y asegúrate de que la `baseURL` apunte a tu backend:

   ```javascript
   axios.defaults.baseURL = 'http://tu-backend-url.com/api';
   ```
## Desarrollo

Para ejecutar el servidor de desarrollo:

```
npm run dev
```

Esto iniciará el servidor de desarrollo de Vite. Abre `http://localhost:5173` en tu navegador para ver la aplicación.

## Construcción para Producción

Para construir la aplicación para producción:

```
npm run build
```

Esto generará una versión optimizada de la aplicación en el directorio `dist`.


## Tecnologías Principales

- Vue 3
- Vite
- Pinia (para manejo de estado)
- Vue Router
- Axios (para peticiones HTTP)
- FormKit
- Tailwind CSS

## Configuración Adicional

Asegúrate de configurar correctamente la URL de tu backend en el archivo de configuración de Axios.
