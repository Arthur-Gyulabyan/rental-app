import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TODO_DESCRIPTION = 'Test todo description';
const CURRENT_DATE = '2026-01-14T13:41:28.168Z';

let apiResponse;

const feature = loadFeature(path.resolve(__dirname, 'create-property-given-no-property-exists-at-the-specified-address-and-the-propertymgr.feature'));

defineFeature(feature, test => {
  test('Given no property exists at the specified address and the PropertyMgr provides name, address, managerName, managerEmail and a positive unitsCount, When the PropertyMgr submits Create Property, Then Property Created is recorded with a new propertyId and the provided details, and the property becomes available to create apartments under it.', ({ given, when, then }) => {
    given('no property exists at the specified address and the PropertyMgr provides name, address, managerName, managerEmail and a positive unitsCount', async () => {
    });

    when('the PropertyMgr submits Create Property', async () => {
      apiResponse = await request(app)
        .post('/api/v1/create-property')
        .send({
          "name": 'Maple Court',
          "address": '12 Main St',
          "managerName": 'Jordan Alvarez',
          "managerEmail": 'pm@rentco.com',
          "unitsCount": '120'
        });
    });

    then('Property Created is recorded with a new propertyId and the provided details, and the property becomes available to create apartments under it.', async () => {
      expect(apiResponse.status).toBe(200);
      expect(apiResponse.body).toHaveProperty('id');
      expect(apiResponse.body.name).toBe('Maple Court');
      expect(apiResponse.body.address).toBe('12 Main St');
      expect(apiResponse.body.managerName).toBe('Jordan Alvarez');
      expect(apiResponse.body.managerEmail).toBe('pm@rentco.com');
      expect(apiResponse.body.unitsCount).toBe('120');

      const propertyId = apiResponse.body.id;

      const apartmentResponse = await request(app)
        .post('/api/v1/create-apartment')
        .send({
          "propertyId": propertyId,
          "unitNumber": '22B',
          "floorAreaSqm": '62',
          "bedrooms": '2',
          "status": 'Occupied'
        });

      expect(apartmentResponse.status).toBe(200);
    });
  });
});