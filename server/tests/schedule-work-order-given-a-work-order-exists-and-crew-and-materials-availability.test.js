import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'schedule-work-order-given-a-work-order-exists-and-crew-and-materials-availability.feature'));

const TODO_DESCRIPTION = 'Test todo description';
const CURRENT_DATE = '2026-01-14T13:41:28.133Z';

let apiResponse;
let workOrderId;

defineFeature(feature, test => {
  test(
    'Given a work order exists and crew and materials availability are known, When the ConstrDept assigns a crew and sets start and end dates, Then Work Order Scheduled is recorded with dates and assigned team.',
    ({ given, when, then }) => {
      given('a work order exists and crew and materials availability are known', async () => {
        const propRes = await request(app)
          .post('/api/v1/create-property')
          .send({
            "name": 'Maple Court',
            "address": '12 Main St',
            "managerName": 'Jordan Alvarez',
            "managerEmail": 'pm@rentco.com',
            "unitsCount": '120'
          });

        const aptRes = await request(app)
          .post('/api/v1/create-apartment')
          .send({
            "propertyId": propRes.body.id,
            "unitNumber": '22B',
            "floorAreaSqm": '62',
            "bedrooms": '2',
            "status": 'Occupied'
          });

        const leaseRes = await request(app)
          .post('/api/v1/create-lease')
          .send({
            "apartmentId": aptRes.body.id,
            "currentRent": '1450',
            "tenantName": 'Alexandra Nguyen'
          });

        const toRes = await request(app)
          .post('/api/v1/create-turnover')
          .send({
            "leaseId": leaseRes.body.id,
            "targetReadyDate": '2025-10-15'
          });

        const renoRes = await request(app)
          .post('/api/v1/request-renovation-estimate')
          .send({
            "turnoverId": toRes.body.id,
            "requestedLevels": 'good',
            "scopeNotes": TODO_DESCRIPTION,
            "targetReadyDate": '2025-10-20'
          });

        const woRes = await request(app)
          .post('/api/v1/create-work-order')
          .send({
            "renovationCaseId": renoRes.body.id,
            "scopeSummary": TODO_DESCRIPTION,
            "materialsList": 'Paint, caulk'
          });

        workOrderId = woRes.body.id;
      });

      when('the ConstrDept assigns a crew and sets start and end dates', async () => {
        apiResponse = await request(app)
          .post('/api/v1/schedule-work-order')
          .send({
            "id": workOrderId,
            "startDate": CURRENT_DATE,
            "endDate": CURRENT_DATE,
            "crewName": 'Crew Alpha',
            "assignedToEmail": 'lead1@rentco.com',
            "materialsReady": 'true',
            "nextActorEmail": 'crew@rentco.com'
          });
      });

      then('Work Order Scheduled is recorded with dates and assigned team.', async () => {
        expect(apiResponse.status).toBe(200);
        expect(apiResponse.body.startDate).toBe(CURRENT_DATE);
        expect(apiResponse.body.endDate).toBe(CURRENT_DATE);
        expect(apiResponse.body.crewName).toBe('Crew Alpha');
      });
    }
  );
});