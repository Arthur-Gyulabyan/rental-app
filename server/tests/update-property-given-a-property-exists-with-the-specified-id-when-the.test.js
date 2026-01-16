import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TODO_DESCRIPTION = 'Test todo description';
const CURRENT_DATE = '2026-01-14T13:41:28.186Z';
let apiResponse;
let propertyId;

const feature = loadFeature(path.resolve(__dirname, 'update-property-given-a-property-exists-with-the-specified-id-when-the.feature'));

defineFeature(feature, test => {
  test(
    'Given a property exists with the specified id, When the PropertyMgr updates the property details (name, address, manager info, units count), Then Property Updated is recorded with the new values.',
    ({ given, when, then }) => {
      given('a property exists with the specified id', async () => {
        const response = await request(app)
          .post('/api/v1/create-property')
          .send({
            "name": 'Maple Court',
            "address": '12 Main St',
            "managerName": 'Jordan Alvarez',
            "managerEmail": 'pm@rentco.com',
            "unitsCount": '120'
          });
        propertyId = response.body.id;
      });

      when('the PropertyMgr updates the property details (name, address, manager info, units count)', async () => {
        apiResponse = await request(app)
          .post('/api/v1/update-property')
          .send({
            "id": propertyId,
            "name": 'Updated Maple Court',
            "address": '14 Main St',
            "managerName": 'Jordan Alvarez Updated',
            "managerEmail": 'pm.updated@rentco.com',
            "unitsCount": '125'
          });
      });

      then('Property Updated is recorded with the new values.', async () => {
        expect(apiResponse.status).toBe(200);
        expect(apiResponse.body.id).toBe(propertyId);
        expect(apiResponse.body.name).toBe('Updated Maple Court');
        expect(apiResponse.body.address).toBe('14 Main St');
        expect(apiResponse.body.managerName).toBe('Jordan Alvarez Updated');
        expect(apiResponse.body.managerEmail).toBe('pm.updated@rentco.com');
        expect(apiResponse.body.unitsCount).toBe('125');
      });
    }
  );
});