import { faker } from '@faker-js/faker';
import { Booking } from './BookingInterfaces';

/**
 * Factory class to centralize the generation of dynamic test data.
 */
export class BookingDataFactory {
  static createBookingData(): Booking {
    const checkinDate = faker.date.soon({ days: 10 });
    const checkoutDate = faker.date.future({ years: 0.1, refDate: checkinDate });

    return {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      totalprice: faker.number.int({ min: 100, max: 1000 }),
      depositpaid: faker.datatype.boolean(),
      bookingdates: {
        checkin: checkinDate.toISOString().split('T')[0],
        checkout: checkoutDate.toISOString().split('T')[0],
      },
      additionalneeds: faker.helpers.arrayElement(['Breakfast', 'Late Checkout', 'WiFi']),
    };
  }
}