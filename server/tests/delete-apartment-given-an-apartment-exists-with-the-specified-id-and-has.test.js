import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'delete-apartment-given-an-apartment-exists-with-the-specified-id-and-has.feature'));

const TODO_DESCRIPTION = 'Test todo description';
const CURRENT_DATE = '2026-01-14T13:41:28.206Z';

let apiResponse;
let apartmentId;

defineFeature(feature, test => {
  test(
    'Given an apartment exists with the specified id and has no active leases, When the PropertyMgr deletes the apartment, Then Apartment Deleted is recorded and the apartment is removed from the system.',
    ({ given, when, then }) => {
      given('an apartment exists with the specified id and has no active leases', async () => {
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

        const apartmentResponse = await request(app)
          .post('/api/v1/create-apartment')
          .send({
            "propertyId": propertyId,
            "unitNumber": '22B',
            "floorAreaSqm": '62',
            "bedrooms": '2',
            "status": 'Occupied'
          });

        apartmentId = apartmentResponse.body.id;
      });

      when('the PropertyMgr deletes the apartment', async () => {
        apiResponse = await request(app)
          .post('/api/v1/delete-apartment')
          .send({ "id": apartmentId });
      });

      then('Apartment Deleted is recorded and the apartment is removed from the system.', async () => {
        expect(apiResponse.status).toBe(200);

        const getResponse = await request(app)
          .get(`/api/v1/get-apartment-by-id/${apartmentId}`);

        expect(getResponse.status).toBe(404);
      });
    }
  );
});