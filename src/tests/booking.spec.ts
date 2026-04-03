import { test, expect } from '@playwright/test';
import { BookingClient } from '../api/BookingClient';
import { BookingDataFactory } from '../data/BookingData.factory';
import { AuthClient } from '../api/AuthClient';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import bookingSchema from '../data/schemas/booking.schema.json';

/**
 * CRUD tests for booking management.
 */
test.describe('Booking Management CRUD', () => {
  
  const ajv = new Ajv();
  addFormats(ajv);
  const validate = ajv.compile(bookingSchema);

  test('Should complete a full booking lifecycle', async ({ request }) => {
    // 1. Setup Data
    const dynamicBookingData = BookingDataFactory.createBookingData();
    const bookingClient = new BookingClient(request);

    // 2. Pre-check API Health
    await bookingClient.checkHealth();

    // 3. Create (POST)
    const startTime = Date.now();
    const response = await bookingClient.createBooking(dynamicBookingData);
    expect(Date.now() - startTime, 'POST response time exceeded limit').toBeLessThan(1000);

    expect(response.bookingid).toBeDefined();
    expect(typeof response.bookingid).toBe('number');
    
    // Validate Schema
    const isPostSchemaValid = validate(response.booking);
    expect(isPostSchemaValid, `Schema errors: ${ajv.errorsText(validate.errors)}`).toBe(true);

    // 4. Read (GET)
    const bookingDetails = await bookingClient.getBooking(response.bookingid);
    expect(validate(bookingDetails)).toBe(true);
    expect(bookingDetails.firstname).toBe(dynamicBookingData.firstname);

    // 5. Authentication
    const authClient = new AuthClient(request);
    const token = await authClient.createToken();

    // 6. Partial Update (PATCH)
    const updatedFirstName = 'GeminiUpdated';
    const patchedBooking = await bookingClient.updatePartialBooking(response.bookingid, { firstname: updatedFirstName }, token);
    expect(patchedBooking.firstname).toBe(updatedFirstName);

    // 7. Delete (DELETE)
    await bookingClient.deleteBooking(response.bookingid, token);

    // 8. Verify Removal (GET 404)
    const deletedResponse = await request.get(`/booking/${response.bookingid}`);
    expect(deletedResponse.status()).toBe(404);
  });
});