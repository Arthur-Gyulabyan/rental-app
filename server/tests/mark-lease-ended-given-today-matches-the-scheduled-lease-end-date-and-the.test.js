import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TODO_DESCRIPTION = 'Test todo description';
const CURRENT_DATE = '2026-01-14T13:41:28.070Z';

let propertyId;
let apartmentId;
let leaseId;
let turnoverId;
let apiResponse;

const feature = loadFeature(path.resolve(__dirname, 'mark-lease-ended-given-today-matches-the-scheduled-lease-end-date-and-the.feature'));

defineFeature(feature, test => {
  test(
    'Given today matches the scheduled lease end date and the lease is still active, When Automation marks the lease as ended, Then Lease Ended is recorded and the associated turnover moves to awaiting vacancy confirmation.',
    ({ given, when, then }) => {
      given('today matches the scheduled lease end date and the lease is still active', async () => {
        const propertyRes = await request(app)
          .post('/api/v1/create-property')
          .send({
            "name": TODO_DESCRIPTION,
            "address": TODO_DESCRIPTION,
            "managerName": TODO_DESCRIPTION,
            "managerEmail": 'pm@example.com',
            "unitsCount": '10'
          });
        propertyId = propertyRes.body.id;

        const apartmentRes = await request(app)
          .post('/api/v1/create-apartment')
          .send({
            "propertyId": propertyId,
            "unitNumber": TODO_DESCRIPTION,
            "floorAreaSqm": '75',
            "bedrooms": '2',
            "status": 'Occupied'
          });
        apartmentId = apartmentRes.body.id;

        const leaseRes = await request(app)
          .post('/api/v1/create-lease')
          .send({
            "apartmentId": apartmentId,
            "currentRent": '1500',
            "tenantName": TODO_DESCRIPTION
          });
        leaseId = leaseRes.body.id;

        const turnoverRes = await request(app)
          .post('/api/v1/create-turnover')
          .send({
            "leaseId": leaseId,
            "targetReadyDate": CURRENT_DATE
          });
        turnoverId = turnoverRes.body.id;
      });

      when('Automation marks the lease as ended', async () => {
        apiResponse = await request(app)
          .post('/api/v1/mark-lease-ended')
          .send({
            "id": leaseId,
            "apartmentId": apartmentId,
            "endDate": CURRENT_DATE,
            "moveOutConfirmedAt": CURRENT_DATE,
            "turnoverId": turnoverId
          });
      });

      then('Lease Ended is recorded and the associated turnover moves to awaiting vacancy confirmation.', async () => {
        expect(apiResponse.status).toBe(200);
        expect(apiResponse.body).toHaveProperty('id', leaseId);
        expect(apiResponse.body).toHaveProperty('moveOutConfirmedAt', CURRENT_DATE);
        expect(apiResponse.body).toHaveProperty('turnoverId', turnoverId);
      });
    }
  );
});