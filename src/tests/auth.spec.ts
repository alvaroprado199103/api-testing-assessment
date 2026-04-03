import { test, expect } from '@playwright/test'; // Importa las herramientas base de Playwright para ejecutar pruebas
import { AuthClient } from '../api/AuthClient'; // Importa la clase de servicio de autenticación desde el directorio api
import Ajv from 'ajv'; // Importa el validador de esquemas
import authSchema from '../data/schemas/auth.schema.json'; // Importa el esquema del token

/**
 * Conjunto de pruebas de humo para verificar la conectividad y seguridad.
 * Garantiza que la comunicación básica con la API de Booker sea estable.
 */
test.describe('Authentication Smoke Tests', () => { // Inicia el bloque descriptivo para pruebas de autenticación
  // Caso de prueba específico para la creación del token
  test('Should generate a valid security token', async ({ request }) => { // Utiliza el contexto de petición inyectado por el test runner
    // Crea una instancia del cliente de autenticación para realizar la operación
    const authClient = new AuthClient(request); // Pasa el motor de peticiones a nuestro cliente personalizado

    // Ejecuta la llamada para generar un nuevo token
    const token = await authClient.createToken(); // Espera a que la promesa resuelva el valor del token desde la API

    // Valida que el token exista en la respuesta
    expect(token).toBeDefined(); // Falla si el servidor no devolvió la propiedad token
    // Valida que el token sea de tipo cadena de texto
    expect(typeof token).toBe('string'); // Asegura que el formato del dato recibido sea el correcto según el contrato
    // Valida que el token tenga contenido real
    expect(token.length).toBeGreaterThan(0); // Verifica que la cadena no esté vacía para ser usada después
  }); // Cierra el caso de prueba individual
}); // Cierra el bloque descriptivo general