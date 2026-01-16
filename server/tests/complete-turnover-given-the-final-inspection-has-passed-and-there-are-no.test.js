import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TODO_DESCRIPTION = 'Test todo description';
const CURRENT_DATE = '2026-01-14T13:41:28.162Z';

let apiResponse;
let propertyId;
let apartmentId;
let leaseId;
let turnoverId;
let inspectionId;

const feature = loadFeature(path.resolve(__dirname, 'complete-turnover-given-the-final-inspection-has-passed-and-there-are-no.feature'));

defineFeature(feature, test => {
  test(
    'Given the final inspection has passed and there are no open work orders, When Automation completes the turnover case, Then Turnover Completed is recorded and the apartment status becomes ready to rent and marketing is notified.',
    ({ given, when, then }) => {
      given('the final inspection has passed and there are no open work orders', async () => {
        const propertyRes = await request(app)
          .post('/api/v1/create-property')
          .send({
            "name": 'Maple Court',
            "address": '12 Main St',
            "managerName": 'Jordan Alvarez',
            "managerEmail": 'pm@rentco.com',
            "unitsCount": '120'
          });
        propertyId = propertyRes.body.id;

        const apartmentRes = await request(app)
          .post('/api/v1/create-apartment')
          .send({
            "propertyId": propertyId,
            "unitNumber": '22B',
            "floorAreaSqm": '62',
            "bedrooms": '2',
            "status": 'Occupied'
          });
        apartmentId = apartmentRes.body.id;

        const leaseRes = await request(app)
          .post('/api/v1/create-lease')
          .send({
            "apartmentId": apartmentId,
            "currentRent": '1450',
            "tenantName": 'Alexandra Nguyen'
          });
        leaseId = leaseRes.body.id;

        const turnoverRes = await request(app)
          .post('/api/v1/create-turnover')
          .send({
            "leaseId": leaseId,
            "targetReadyDate": '2025-10-15'
          });
        turnoverId = turnoverRes.body.id;

        const inspectionRes = await request(app)
          .post('/api/v1/schedule-inspection')
          .send({
            "turnoverId": turnoverId,
            "scheduledAt": CURRENT_DATE
          });
        inspectionId = inspectionRes.body.id;

        await request(app)
          .post('/api/v1/pass-final-inspection')
          .send({
            "id": inspectionId
          });
      });

      when('Automation completes the turnover case', async () => {
        apiResponse = await request(app)
          .post('/api/v1/complete-turnover')
          .send({
            "id": turnoverId,
            "readyToRentDate": '2025-10-20',
            "listingReady": 'true',
            "marketingEmail": 'list@rentco.com',
            "notes": TODO_DESCRIPTION
          });
      });

      then('Turnover Completed is recorded and the apartment status becomes ready to rent and marketing is notified', async () => {
        expect(apiResponse.status).toBe(200);
        expect(apiResponse.body.id).toBe(turnoverId);
        expect(apiResponse.body.listingReady).toBe('true');
        expect(apiResponse.body.marketingEmail).toBe('list@rentco.com');
      });
    }
  );
});