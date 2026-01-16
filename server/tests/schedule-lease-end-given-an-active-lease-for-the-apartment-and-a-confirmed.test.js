import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'schedule-lease-end-given-an-active-lease-for-the-apartment-and-a-confirmed.feature'));

const TODO_DESCRIPTION = 'Test todo description';
const CURRENT_DATE = '2026-01-14T13:41:28.048Z';

let apiResponse;
let leaseId;
let apartmentId;

defineFeature(feature, test => {
  test(
    'Given an active lease for the apartment and a confirmed termination date, When the PropertyMgr schedules the lease end for that date, Then Lease End Scheduled is recorded with leaseId, apartmentId and endDate and next-step notifications are queued.',
    ({ given, when, then }) => {
      given('an active lease for the apartment and a confirmed termination date', async () => {
        const propertyResponse = await request(app)
          .post('/api/v1/create-property')
          .send({
            "name": TODO_DESCRIPTION,
            "address": TODO_DESCRIPTION,
            "managerName": TODO_DESCRIPTION,
            "managerEmail": 'pm@rentco.com',
            "unitsCount": '10'
          });

        const apartmentResponse = await request(app)
          .post('/api/v1/create-apartment')
          .send({
            "propertyId": propertyResponse.body.id,
            "unitNumber": '101',
            "floorAreaSqm": '50',
            "bedrooms": '1',
            "status": 'Available'
          });

        apartmentId = apartmentResponse.body.id;

        const leaseResponse = await request(app)
          .post('/api/v1/create-lease')
          .send({
            "apartmentId": apartmentId,
            "currentRent": '1500',
            "nextActorEmail": 'ops@rentco.com',
            "tenantName": TODO_DESCRIPTION
          });

        leaseId = leaseResponse.body.id;
      });

      when('the PropertyMgr schedules the lease end for that date', async () => {
        apiResponse = await request(app)
          .post('/api/v1/schedule-lease-end')
          .send({
            "id": leaseId,
            "apartmentId": apartmentId,
            "endDate": CURRENT_DATE,
            "noticeDate": CURRENT_DATE,
            "currentRent": '1500',
            "nextActorEmail": 'ops@rentco.com'
          });
      });

      then('Lease End Scheduled is recorded with leaseId, apartmentId and endDate and next-step notifications are queued.', async () => {
        expect(apiResponse.status).toBe(200);
        expect(apiResponse.body).toHaveProperty('id', leaseId);
        expect(apiResponse.body).toHaveProperty('apartmentId', apartmentId);
        expect(apiResponse.body).toHaveProperty('endDate', CURRENT_DATE);
      });
    }
  );
});