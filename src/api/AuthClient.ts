import { APIRequestContext, expect } from '@playwright/test'; // Importa el contexto de API y la herramienta de aserciones de Playwright

/**
 * AuthClient handles all requests related to the /auth endpoint.
 * It centralizes the logic for obtaining security tokens.
 */
export class AuthClient { // Define la clase para gestionar la lógica de autenticación
  private request: APIRequestContext; // Declara la propiedad privada para realizar peticiones HTTP

  // Constructor to initialize the client with the provided request context
  constructor(request: APIRequestContext) { // El constructor recibe el contexto de petición inyectado por Playwright
    this.request = request; // Asocia el contexto recibido a la propiedad de la clase para usarlo en los métodos
  } // Finaliza el constructor

  /**
   * Performs a POST request to generate an access token.
   * @returns A promise that resolves to the token string.
   */
  async createToken(): Promise<string> { // Método asíncrono que solicita un nuevo token de seguridad
    const response = await this.request.post('/auth', { // Realiza una petición POST al endpoint de autenticación
      data: { // Define el cuerpo de la petición con las credenciales necesarias
        username: process.env.BOOKER_USERNAME, // Obtiene el nombre de usuario de las variables de entorno configuradas
        password: process.env.BOOKER_PASSWORD, // Obtiene la contraseña de las variables de entorno configuradas
      }, // Cierra el objeto de datos de la petición
    }); // Finaliza la ejecución del POST y espera la respuesta

    expect(response.ok()).toBeTruthy(); // Valida que la respuesta sea exitosa (Status 200-299)
    const responseBody = await response.json(); // Extrae y parsea el cuerpo de la respuesta en formato JSON
    return responseBody.token; // Devuelve el valor del token generado por el servidor
  } // Finaliza el método createToken
} // Cierra la clase AuthClient