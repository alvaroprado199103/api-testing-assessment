import { test, expect } from '@playwright/test';
import { AuthClient } from '../api/AuthClient';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import authSchema from '../data/schemas/auth.schema.json';

/**
 * Smoke tests for authentication security.
 */
test.describe('Authentication Smoke Tests', () => {
  
  const ajv = new Ajv();
  addFormats(ajv);

  test('Should generate a valid security token', async ({ request }) => {
    const startTime = Date.now();
    const authClient = new AuthClient(request);
    const token = await authClient.createToken();

    const duration = Date.now() - startTime;
    expect(duration, 'Auth response time is too high').toBeLessThan(1500);

    // Schema Validation
    const validate = ajv.compile(authSchema);
    const isValid = validate({ token });
    expect(isValid, `Auth schema error: ${ajv.errorsText(validate.errors)}`).toBe(true);

    expect(token).toBeDefined();
    expect(token.length).toBeGreaterThan(0);
  });
});