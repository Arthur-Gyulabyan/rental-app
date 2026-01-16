import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'create-apartment-given-the-specified-property-exists-and-no-apartment-with-the.feature'));

const TODO_DESCRIPTION = 'Test todo description';
const CURRENT_DATE = '2026-01-14T13:41:28.174Z';

let apiResponse;
let propertyId;

defineFeature(feature, test => {
  test(
    'Given the specified property exists and no apartment with the same unitNumber exists under that property, and floorAreaSqm and bedrooms are positive values, When the PropertyMgr submits Create Apartment with propertyId, unitNumber, floorAreaSqm, bedrooms and a valid initial status (Occupied, Vacant or Ready), Then Apartment Created is recorded with a new apartmentId linked to the property and the apartment is available for leasing and turnover workflows.',
    ({ given, when, then }) => {
      given('the specified property exists and no apartment with the same unitNumber exists under that property, and floorAreaSqm and bedrooms are positive values', async () => {
        const createPropertyResponse = await request(app)
          .post('/api/v1/create-property')
          .send({
            'name': 'Maple Court',
            'address': '12 Main St',
            'managerName': 'Jordan Alvarez',
            'managerEmail': 'pm@rentco.com',
            'unitsCount': '120'
          });
        propertyId = createPropertyResponse.body.id;
      });

      when('the PropertyMgr submits Create Apartment with propertyId, unitNumber, floorAreaSqm, bedrooms and a valid initial status (Occupied, Vacant or Ready)', async () => {
        apiResponse = await request(app)
          .post('/api/v1/create-apartment')
          .send({
            'propertyId': propertyId,
            'unitNumber': '22B',
            'floorAreaSqm': '62',
            'bedrooms': '2',
            'status': 'Occupied'
          });
      });

      then('Apartment Created is recorded with a new apartmentId linked to the property and the apartment is available for leasing and turnover workflows.', async () => {
        expect(apiResponse.status).toBe(200);
        expect(apiResponse.body.id).toBeDefined();
        expect(apiResponse.body.propertyId).toBe(propertyId);
        expect(apiResponse.body.unitNumber).toBe('22B');
        expect(apiResponse.body.floorAreaSqm).toBe('62');
        expect(apiResponse.body.bedrooms).toBe('2');
        expect(apiResponse.body.status).toBe('Occupied');
      });
    }
  );
});