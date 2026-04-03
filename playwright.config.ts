import { defineConfig } from '@playwright/test'; // Importa la función para definir la configuración de Playwright
import * as dotenv from 'dotenv'; // Importa la librería para gestionar variables de entorno desde archivos .env
import * as path from 'path'; // Importa el módulo nativo de Node.js para manejar rutas de archivos y directorios

/**
 * Configuración de la carga de variables de entorno.
 */
dotenv.config({ path: path.resolve(__dirname, '.env') }); // Carga el archivo .env localizado en la raíz del proyecto

export default defineConfig({ // Exporta la configuración global del framework de pruebas
  // Localización de las pruebas
  testDir: './src/tests', // Indica a Playwright que busque los archivos .spec.ts en esta carpeta
  // Ubicación de los resultados
  outputDir: './test-results', // Directorio donde se almacenarán videos, trazas y capturas de fallos
  // Tiempo de vida de la prueba
  timeout: 30 * 1000, // Cada test individual tiene un máximo de 30 segundos para finalizar
  // Configuración de aserciones
  expect: { // Bloque de configuración para las validaciones
    timeout: 5000, // Las aserciones esperarán un máximo de 5 segundos antes de fallar
  }, // Fin del bloque de configuración de aserciones
  // Paralelismo de ejecución
  fullyParallel: true, // Ejecuta los tests dentro de los archivos de forma paralela para ahorrar tiempo
  // Restricciones en CI
  forbidOnly: !!process.env.CI, // Lanza error si existe un 'test.only' en entornos de integración continua
  // Estrategia de reintentos
  retries: process.env.CI ? 2 : 0, // Reintenta pruebas fallidas 2 veces en CI y ninguna en local
  // Gestión de hilos de ejecución
  workers: process.env.CI ? 1 : undefined, // Usa un solo hilo en CI para estabilidad, y el máximo en local para velocidad
  // Formatos de reporte
  reporter: [['html'], ['list']], // Genera un reporte visual en HTML y un resumen detallado en la terminal

  // Definición de proyectos (necesario para filtrar ejecuciones por nombre)
  projects: [
    {
      name: 'chromium', // Nombre del proyecto que busca GitHub Actions
      use: { browserName: 'chromium' }, // Indica que usará el motor Chromium
    },
  ],

  // Opciones base para las peticiones
  use: { // Configuración compartida para todas las pruebas
    // Dirección del servidor
    baseURL: 'https://restful-booker.herokuapp.com', // URL base para no tener que repetirla en cada llamada a la API
    // Trazabilidad de fallos
    trace: 'on-first-retry', // Graba un registro detallado de la ejecución solo si el test falla y se reintenta
  }, // Fin de la configuración compartida
}); // Fin de la configuración de Playwright
