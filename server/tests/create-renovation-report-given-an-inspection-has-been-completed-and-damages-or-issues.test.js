import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TODO_DESCRIPTION = 'Test todo description';
const CURRENT_DATE = '2026-01-14T13:41:28.096Z';

let apiResponse;
let propertyId;
let apartmentId;
let leaseId;
let turnoverId;
let inspectionId;

const feature = loadFeature(path.resolve(__dirname, 'create-renovation-report-given-an-inspection-has-been-completed-and-damages-or-issues.feature'));

defineFeature(feature, test => {
  test(
    'Given an inspection has been completed and damages or issues were observed, When the Inspector itemizes damages with severity, locations and evidence, Then Damage Report Created is recorded and linked to the turnover.',
    ({ given, when, then }) => {
      given('an inspection has been completed and damages or issues were observed', async () => {
        const propRes = await request(app)
          .post('/api/v1/create-property')
          .send({
            "name": TODO_DESCRIPTION,
            "address": TODO_DESCRIPTION,
            "managerName": TODO_DESCRIPTION,
            "managerEmail": 'pm@example.com',
            "unitsCount": '10'
          });
        propertyId = propRes.body.id;

        const aptRes = await request(app)
          .post('/api/v1/create-apartment')
          .send({
            "propertyId": propertyId,
            "unitNumber": '101',
            "floorAreaSqm": '50',
            "bedrooms": '1',
            "status": 'Occupied'
          });
        apartmentId = aptRes.body.id;

        const leaseRes = await request(app)
          .post('/api/v1/create-lease')
          .send({
            "apartmentId": apartmentId,
            "currentRent": '1000',
            "tenantName": TODO_DESCRIPTION
          });
        leaseId = leaseRes.body.id;

        const turnoverRes = await request(app)
          .post('/api/v1/create-turnover')
          .send({
            "leaseId": leaseId,
            "targetReadyDate": '2026-02-01'
          });
        turnoverId = turnoverRes.body.id;

        const scheduleRes = await request(app)
          .post('/api/v1/schedule-inspection')
          .send({
            "turnoverId": turnoverId,
            "scheduledAt": CURRENT_DATE,
            "assignedToEmail": 'inspector@example.com'
          });
        inspectionId = scheduleRes.body.id;

        await request(app)
          .post('/api/v1/complete-inspection')
          .send({
            "id": inspectionId,
            "turnoverId": turnoverId,
            "completedAt": CURRENT_DATE,
            "findingsSummary": TODO_DESCRIPTION,
            "hasDamages": 'true'
          });
      });

      when('the Inspector itemizes damages with severity, locations and evidence', async () => {
        apiResponse = await request(app)
          .post('/api/v1/create-renovation-report')
          .send({
            "inspectionId": inspectionId,
            "damageSeverity": 'medium',
            "estimatedRepairCost": '500',
            "damageSummary": TODO_DESCRIPTION
          });
      });

      then('Damage Report Created is recorded and linked to the turnover.', async () => {
        expect(apiResponse.status).toBe(200);
        expect(apiResponse.body).toHaveProperty('id');
        expect(apiResponse.body.inspectionId).toBe(inspectionId);
        expect(apiResponse.body.damageSummary).toBe(TODO_DESCRIPTION);
      });
    }
  );
});