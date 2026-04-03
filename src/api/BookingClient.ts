import { APIRequestContext, expect } from '@playwright/test';
import { Booking, BookingResponse } from '../data/BookingInterfaces';

/**
 * Handles all interactions with the /booking endpoint.
 */
export class BookingClient {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * Performs a health check on the API.
   */
  async checkHealth(): Promise<number> {
    const response = await this.request.get('/ping');
    expect(response.status(), 'API Health Check failed').toBe(201);
    return response.status();
  }

  /**
   * Creates a new booking.
   */
  async createBooking(bookingData: Booking): Promise<BookingResponse> {
    const response = await this.request.post('/booking', {
      data: bookingData,
    });

    expect(response.ok()).toBeTruthy();
    return await response.json();
  }

  /**
   * Retrieves booking details by ID.
   */
  async getBooking(id: number): Promise<Booking> {
    const response = await this.request.get(`/booking/${id}`);
    expect(response.ok()).toBeTruthy();
    return await response.json();
  }

  /**
   * Partially updates a booking using PATCH.
   */
  async updatePartialBooking(id: number, partialData: Partial<Booking>, token: string): Promise<Booking> {
    const response = await this.request.patch(`/booking/${id}`, {
      data: partialData,
      headers: {
        'Cookie': `token=${token}`,
      },
    });

    expect(response.ok()).toBeTruthy();
    return await response.json();
  }

  /**
   * Deletes a booking by ID.
   */
  async deleteBooking(id: number, token: string): Promise<void> {
    const response = await this.request.delete(`/booking/${id}`, {
      headers: {
        'Cookie': `token=${token}`,
      },
    });

    expect(response.status()).toBe(201);
  }
}
