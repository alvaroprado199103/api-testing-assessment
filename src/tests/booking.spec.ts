import { test, expect } from '@playwright/test'; // Importa las funciones principales de Playwright para definir y ejecutar pruebas
import { BookingClient } from '../api/BookingClient'; // Importa nuestra clase de servicio que maneja las peticiones de reservas
import { BookingDataFactory } from '../data/BookingData.factory'; // Importa la fábrica encargada de generar datos aleatorios y dinámicos
import { AuthClient } from '../api/AuthClient'; // Importa el cliente de autenticación para obtener tokens de seguridad
import Ajv from 'ajv'; // Importa la librería Ajv para realizar la validación de esquemas JSON
import addFormats from 'ajv-formats'; // Importa el complemento para validar formatos específicos como 'date'
import bookingSchema from '../data/schemas/booking.schema.json'; // Importa el archivo de esquema del contrato de reserva

/**
 * Bloque de pruebas para la gestión del ciclo de vida de las reservas (CRUD).
 * Aquí validaremos que la API permita crear, leer, actualizar y borrar registros correctamente.
 */
test.describe('Booking Management CRUD', () => { // Inicia la agrupación de casos de prueba para el recurso de reservas
  
  // Instanciamos Ajv una vez para ser utilizado en todas las validaciones del bloque
  const ajv = new Ajv(); // Crea la instancia del validador Ajv
  addFormats(ajv); // Añade el soporte para formatos de fecha al validador
  const validate = ajv.compile(bookingSchema); // Compila el esquema para realizar validaciones rápidas

  test('Should create a new booking successfully', async ({ request }) => { // Define el caso de prueba para la creación de una reserva
    // 1. PREPARACIÓN: Generamos los datos dinámicos usando nuestra fábrica
    const dynamicBookingData = BookingDataFactory.createBookingData(); // Obtiene un objeto con nombre, fechas y precios aleatorios

    // 2. ACCIÓN: Inicializamos el cliente y enviamos la petición a la API
    const bookingClient = new BookingClient(request); // Instancia el cliente de reservas pasando el contexto de petición actual
    const response = await bookingClient.createBooking(dynamicBookingData); // Llama al método POST y espera la respuesta del servidor

    // 3. VALIDACIÓN: Verificamos que la respuesta del servidor coincida con lo esperado
    expect(response.bookingid).toBeDefined(); // Comprueba que la API haya generado y devuelto un ID único para la reserva
    expect(typeof response.bookingid).toBe('number'); // Valida que el identificador de la reserva sea un dato de tipo numérico
    
    // VALIDACIÓN DE ESQUEMA (CONTRATO): Validamos que la estructura del objeto 'booking' sea la correcta
    const isPostSchemaValid = validate(response.booking); // Ejecuta la validación del esquema sobre la respuesta
    expect(isPostSchemaValid, `POST schema error: ${JSON.stringify(validate.errors)}`).toBe(true); // Falla si el contrato se rompió
    expect(isPostSchemaValid, `Errors found in POST contract: ${ajv.errorsText(validate.errors)}`).toBe(true); // Valida el esquema y genera un mensaje legible en inglés si falla

    expect(response.booking.firstname).toBe(dynamicBookingData.firstname); // Verifica que el nombre en la respuesta sea igual al enviado
    expect(response.booking.lastname).toBe(dynamicBookingData.lastname); // Valida que el apellido guardado coincida con el generado por la fábrica
    expect(response.booking.totalprice).toBe(dynamicBookingData.totalprice); // Asegura que el precio total no haya cambiado en el proceso
    expect(response.booking.depositpaid).toBe(dynamicBookingData.depositpaid); // Confirma que el estado del depósito sea el correcto

    // 4. VERIFICACIÓN DE EXISTENCIA: Consultamos la reserva recién creada por su ID
    const bookingDetails = await bookingClient.getBooking(response.bookingid); // Realiza la petición GET al servidor

    // VALIDACIÓN DE ESQUEMA (CONTRATO): Validamos que la respuesta del GET cumpla con el contrato
    const isGetSchemaValid = validate(bookingDetails); // Ejecuta la validación del esquema sobre los detalles obtenidos
    expect(isGetSchemaValid, `GET schema error: ${JSON.stringify(validate.errors)}`).toBe(true); // Falla si el contrato se rompió
    expect(isGetSchemaValid, `Errors found in GET contract: ${ajv.errorsText(validate.errors)}`).toBe(true); // Valida el esquema y genera un mensaje legible en inglés si falla

    // 5. VALIDACIÓN DE DATOS PERSISTIDOS: Comparamos que los datos en la base coincidan con los originales
    expect(bookingDetails.firstname).toBe(dynamicBookingData.firstname); // Comprueba que el nombre persistido sea el correcto
    expect(bookingDetails.lastname).toBe(dynamicBookingData.lastname); // Comprueba que el apellido persistido sea el correcto
    expect(bookingDetails.bookingdates.checkin).toBe(dynamicBookingData.bookingdates.checkin); // Valida la fecha de entrada guardada
    expect(bookingDetails.bookingdates.checkout).toBe(dynamicBookingData.bookingdates.checkout); // Valida la fecha de salida guardada

    // 6. AUTENTICACIÓN: Obtenemos un token para las operaciones protegidas
    const authClient = new AuthClient(request); // Inicializa el cliente de autenticación
    const token = await authClient.createToken(); // Solicita un nuevo token dinámico al servidor

    // 7. ACTUALIZACIÓN (PATCH): Modificamos parcialmente el nombre del huésped
    const updatedFirstName = 'UpdatedName'; // Definimos el nuevo valor para el nombre
    const patchedBooking = await bookingClient.updatePartialBooking(response.bookingid, { firstname: updatedFirstName }, token); // Ejecuta el parche
    
    // VALIDACIÓN DE ESQUEMA (CONTRATO): Validamos que la respuesta del PATCH mantenga la estructura correcta
    const isPatchSchemaValid = validate(patchedBooking); // Ejecuta la validación del esquema sobre la reserva actualizada
    expect(isPatchSchemaValid, `PATCH schema error: ${JSON.stringify(validate.errors)}`).toBe(true); // Falla si el contrato se rompió
    expect(isPatchSchemaValid, `Errors found in PATCH contract: ${ajv.errorsText(validate.errors)}`).toBe(true); // Valida el esquema y genera un mensaje legible en inglés si falla

    // 8. VALIDACIÓN DE ACTUALIZACIÓN: Verificamos que el cambio se haya aplicado
    expect(patchedBooking.firstname).toBe(updatedFirstName); // Confirma que el nombre ahora es el valor actualizado
    expect(patchedBooking.lastname).toBe(dynamicBookingData.lastname); // Asegura que el apellido no haya cambiado

    // 9. ELIMINACIÓN (DELETE): Borramos la reserva para finalizar el ciclo de vida
    await bookingClient.deleteBooking(response.bookingid, token); // Ejecuta el borrado usando el ID y el token

    // 10. CONFIRMACIÓN DE BORRADO: Intentamos obtener la reserva y validamos que ya no exista
    const deletedResponse = await request.get(`/booking/${response.bookingid}`); // Realiza una petición directa al ID borrado
    expect(deletedResponse.status()).toBe(404); // Valida que el servidor devuelva un error 404 (No encontrado)
  }); // Cierra el caso de prueba de creación exitosa
}); // Cierra el bloque descriptivo del CRUD de reservas