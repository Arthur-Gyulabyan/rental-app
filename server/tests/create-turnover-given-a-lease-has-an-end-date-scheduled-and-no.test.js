import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'create-turnover-given-a-lease-has-an-end-date-scheduled-and-no.feature'));

const TODO_DESCRIPTION = 'Test todo description';
const CURRENT_DATE = '2026-01-14T13:41:28.057Z';

let apiResponse;
let leaseId;
let apartmentId;

defineFeature(feature, test => {
  test(
    'Given a lease has an end date scheduled and no turnover exists for that lease, When Automation creates a turnover case for the apartment, Then Turnover Created is recorded linking the lease, apartment and target dates.',
    ({ given, when, then }) => {
      given('a lease has an end date scheduled and no turnover exists for that lease', async () => {
        const propertyRes = await request(app)
          .post('/api/v1/create-property')
          .send({
            "name": 'Maple Court',
            "address": '12 Main St',
            "managerName": 'Jordan Alvarez',
            "managerEmail": 'pm@rentco.com',
            "unitsCount": '120'
          });

        const apartmentRes = await request(app)
          .post('/api/v1/create-apartment')
          .send({
            "propertyId": propertyRes.body.id,
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

        await request(app)
          .post('/api/v1/schedule-lease-end')
          .send({
            "id": leaseId,
            "apartmentId": apartmentId,
            "endDate": '2025-09-30',
            "currentRent": '1450'
          });
      });

      when('Automation creates a turnover case for the apartment', async () => {
        apiResponse = await request(app)
          .post('/api/v1/create-turnover')
          .send({
            "leaseId": leaseId,
            "targetReadyDate": '2025-10-15'
          });
      });

      then('Turnover Created is recorded linking the lease, apartment and target dates', async () => {
        expect(apiResponse.status).toBe(200);
        expect(apiResponse.body).toHaveProperty('id');
        expect(apiResponse.body.leaseId).toBe(leaseId);
        expect(apiResponse.body.targetReadyDate).toBe('2025-10-15');
      });
    }
  );
});