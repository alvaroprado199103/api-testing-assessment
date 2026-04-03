import { faker } from '@faker-js/faker'; // Importa la librería Faker para generar datos falsos pero realistas
import { Booking } from './BookingInterfaces'; // Importa el contrato de datos para asegurar el tipado correcto

export class BookingDataFactory { // Define la clase bajo el patrón Factory para centralizar la creación de datos
  static createBookingData(): Booking { // Método estático que genera una reserva nueva sin instanciar la clase
    const checkinDate = faker.date.soon({ days: 10 }); // Crea una fecha de entrada aleatoria cercana a hoy
    const checkoutDate = faker.date.future({ years: 0.1, refDate: checkinDate }); // Crea una fecha de salida garantizando que sea posterior a la entrada

    return { // Inicia la construcción del objeto que representa una reserva de hotel
      firstname: faker.person.firstName(), // Asigna un nombre de pila generado aleatoriamente
      lastname: faker.person.lastName(), // Asigna un apellido generado aleatoriamente
      totalprice: faker.number.int({ min: 100, max: 1000 }), // Asigna un precio entero aleatorio entre 100 y 1000
      depositpaid: faker.datatype.boolean(), // Asigna un valor de verdad (sí/no) para el depósito pagado
      bookingdates: { // Inicia el objeto anidado que contiene las fechas de la estadía
        checkin: checkinDate.toISOString().split('T')[0], // Extrae la fecha de entrada en formato Año-Mes-Día
        checkout: checkoutDate.toISOString().split('T')[0], // Extrae la fecha de salida en formato Año-Mes-Día
      }, // Cierra el objeto de fechas de estadía
      additionalneeds: faker.helpers.arrayElement(['Breakfast', 'Late Checkout', 'WiFi']), // Elige un servicio extra de la lista al azar
    }; // Devuelve el objeto completo listo para ser enviado a la API
  } // Fin del método de creación de datos
} // Fin de la clase BookingDataFactory