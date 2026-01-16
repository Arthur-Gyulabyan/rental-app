import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TODO_DESCRIPTION = 'Test todo description';
const CURRENT_DATE = '2026-01-14T13:41:28.076Z';

let apiResponse;
let turnoverId;

const feature = loadFeature(path.resolve(__dirname, 'record-apartment-vacated-given-the-tenant-has-returned-keys-and-the-apartment.feature'));

defineFeature(feature, test => {
  test(
    'Given the tenant has returned keys and the apartment is empty, When the PropertyMgr records the apartment as vacated, Then Apartment Vacated is recorded with timestamp and actor and downstream actors are notified.',
    ({ given, when, then }) => {
      given('the tenant has returned keys and the apartment is empty', async () => {
        const propertyRes = await request(app)
          .post('/api/v1/create-property')
          .send({
            "name": TODO_DESCRIPTION,
            "address": TODO_DESCRIPTION,
            "managerName": TODO_DESCRIPTION,
            "managerEmail": 'pm@rentco.com',
            "unitsCount": '1'
          });

        const apartmentRes = await request(app)
          .post('/api/v1/create-apartment')
          .send({
            "propertyId": propertyRes.body.id,
            "unitNumber": '101',
            "floorAreaSqm": '50',
            "bedrooms": '1',
            "status": 'Occupied'
          });

        const leaseRes = await request(app)
          .post('/api/v1/create-lease')
          .send({
            "apartmentId": apartmentRes.body.id,
            "currentRent": '1000',
            "tenantName": TODO_DESCRIPTION
          });

        const turnoverRes = await request(app)
          .post('/api/v1/create-turnover')
          .send({
            "leaseId": leaseRes.body.id,
            "targetReadyDate": CURRENT_DATE,
            "nextActorEmail": 'inspections@rentco.com'
          });

        turnoverId = turnoverRes.body.id;
      });

      when('the PropertyMgr records the apartment as vacated', async () => {
        apiResponse = await request(app)
          .post('/api/v1/record-apartment-vacated')
          .send({
            "id": turnoverId,
            "vacatedAt": CURRENT_DATE,
            "keysReturned": 'true',
            "notes": TODO_DESCRIPTION,
            "nextActorEmail": 'inspections@rentco.com'
          });
      });

      then('Apartment Vacated is recorded with timestamp and actor and downstream actors are notified.', async () => {
        expect(apiResponse.status).toBe(200);
        expect(apiResponse.body).toHaveProperty('id', turnoverId);
        expect(apiResponse.body).toHaveProperty('vacatedAt', CURRENT_DATE);
        expect(apiResponse.body).toHaveProperty('keysReturned', 'true');
      });
    }
  );
});