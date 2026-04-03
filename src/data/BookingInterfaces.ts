/**
 * Interface to define the structure of check-in and check-out dates.
 */
export interface BookingDates { // Define el contrato para las fechas de entrada y salida
  checkin: string; // Fecha en la que el huésped ingresa al hotel (formato texto)
  checkout: string; // Fecha en la que el huésped deja el hotel (formato texto)
} // Cierra la definición de fechas

/**
 * Main interface representing the body of a booking.
 * This contract is used for both sending data and validating responses.
 */
export interface Booking { // Define el contrato principal para la información de una reserva
  firstname: string; // Nombre del cliente que realiza la reserva
  lastname: string; // Apellido del cliente que realiza la reserva
  totalprice: number; // Costo total de la reserva expresado en números
  depositpaid: boolean; // Indica con un booleano si la reserva ya fue abonada
  bookingdates: BookingDates; // Referencia a la interfaz de fechas definida anteriormente
  additionalneeds?: string; // Propiedad opcional para requerimientos específicos del cliente
} // Cierra la definición de la reserva

export interface BookingResponse { // Define la estructura del objeto que devuelve la API al crear una reserva
  bookingid: number; // El ID único que la base de datos asigna a la nueva reserva
  booking: Booking; // El objeto con los datos de la reserva que acabamos de enviar
} // Cierra la definición de la respuesta