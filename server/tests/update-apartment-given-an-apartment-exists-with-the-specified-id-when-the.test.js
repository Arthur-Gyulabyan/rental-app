import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TODO_DESCRIPTION = 'Test todo description';
const CURRENT_DATE = '2026-01-14T13:41:28.198Z';

let apiResponse;
let apartmentId;

const feature = loadFeature(path.resolve(__dirname, 'update-apartment-given-an-apartment-exists-with-the-specified-id-when-the.feature'));

defineFeature(feature, test => {
  test(
    'Given an apartment exists with the specified id, When the PropertyMgr updates the apartment details (unit number, floor area, bedrooms, status), Then Apartment Updated is recorded with the new values.',
    ({ given, when, then }) => {
      given('an apartment exists with the specified id', async () => {
        const propertyResponse = await request(app)
          .post('/api/v1/create-property')
          .send({
            "name": 'Maple Court',
            "address": '12 Main St',
            "managerName": 'Jordan Alvarez',
            "managerEmail": 'pm@rentco.com',
            "unitsCount": '120'
          });

        const propertyId = propertyResponse.body.id;

        const createAptResponse = await request(app)
          .post('/api/v1/create-apartment')
          .send({
            "propertyId": propertyId,
            "unitNumber": '22B',
            "floorAreaSqm": '62',
            "bedrooms": '2',
            "status": 'Occupied'
          });

        apartmentId = createAptResponse.body.id;
      });

      when('the PropertyMgr updates the apartment details (unit number, floor area, bedrooms, status)', async () => {
        apiResponse = await request(app)
          .post('/api/v1/update-apartment')
          .send({
            "id": apartmentId,
            "unitNumber": '23C',
            "floorAreaSqm": '75',
            "bedrooms": '3',
            "status": 'Vacant'
          });
      });

      then('Apartment Updated is recorded with the new values.', async () => {
        expect(apiResponse.status).toBe(200);
        expect(apiResponse.body.id).toBe(apartmentId);
        expect(apiResponse.body.unitNumber).toBe('23C');
        expect(apiResponse.body.floorAreaSqm).toBe('75');
        expect(apiResponse.body.bedrooms).toBe('3');
        expect(apiResponse.body.status).toBe('Vacant');
      });
    }
  );
});