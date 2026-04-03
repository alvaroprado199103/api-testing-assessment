/**
 * Interface to define the structure of check-in and check-out dates.
 */
export interface BookingDates {
  checkin: string;
  checkout: string;
}

/**
 * Main interface representing the body of a booking.
 */
export interface Booking {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds?: string;
}

export interface BookingResponse {
  bookingid: number;
  booking: Booking;
}