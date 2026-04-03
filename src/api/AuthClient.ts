import { APIRequestContext, expect } from '@playwright/test';

/**
 * Centralizes the logic for obtaining security tokens via /auth.
 */
export class AuthClient {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * Generates a new access token using environment credentials.
   */
  async createToken(): Promise<string> {
    const response = await this.request.post('/auth', {
      data: {
        username: process.env.BOOKER_USERNAME,
        password: process.env.BOOKER_PASSWORD,
      },
    });

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    return responseBody.token;
  }
}