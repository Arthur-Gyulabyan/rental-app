import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'complete-inspection-given-an-inspection-appointment-exists-for-the-turnover-when-the.feature'));

const TODO_DESCRIPTION = 'Test todo description';
const CURRENT_DATE = '2026-01-14T13:41:28.086Z';

let apiResponse;
let propertyId;
let apartmentId;
let leaseId;
let turnoverId;
let inspectionId;

defineFeature(feature, test => {
  test(
    'Given an inspection appointment exists for the turnover, When the Inspector records findings and marks the inspection complete, Then Inspection Completed is recorded with a summary of results.',
    ({ given, when, then }) => {
      given('an inspection appointment exists for the turnover', async () => {
        const propertyRes = await request(app)
          .post('/api/v1/create-property')
          .send({
            'name': 'Maple Court',
            'address': '12 Main St',
            'managerName': 'Jordan Alvarez',
            'managerEmail': 'pm@rentco.com',
            'unitsCount': '120'
          });
        propertyId = propertyRes.body.id;

        const apartmentRes = await request(app)
          .post('/api/v1/create-apartment')
          .send({
            'propertyId': propertyId,
            'unitNumber': '22B',
            'floorAreaSqm': '62',
            'bedrooms': '2',
            'status': 'Occupied'
          });
        apartmentId = apartmentRes.body.id;

        const leaseRes = await request(app)
          .post('/api/v1/create-lease')
          .send({
            'apartmentId': apartmentId,
            'currentRent': '1450',
            'tenantName': 'Alexandra Nguyen'
          });
        leaseId = leaseRes.body.id;

        const turnoverRes = await request(app)
          .post('/api/v1/create-turnover')
          .send({
            'leaseId': leaseId,
            'targetReadyDate': '2025-10-15'
          });
        turnoverId = turnoverRes.body.id;

        const inspectionRes = await request(app)
          .post('/api/v1/schedule-inspection')
          .send({
            'turnoverId': turnoverId,
            'scheduledAt': CURRENT_DATE
          });
        inspectionId = inspectionRes.body.id;
      });

      when('the Inspector records findings and marks the inspection complete', async () => {
        apiResponse = await request(app)
          .post('/api/v1/complete-inspection')
          .send({
            'id': inspectionId,
            'turnoverId': turnoverId,
            'findingsSummary': TODO_DESCRIPTION,
            'completedAt': CURRENT_DATE
          });
      });

      then('Inspection Completed is recorded with a summary of results.', async () => {
        expect(apiResponse.status).toBe(200);
        expect(apiResponse.body).toHaveProperty('id', inspectionId);
        expect(apiResponse.body).toHaveProperty('findingsSummary', TODO_DESCRIPTION);
      });
    }
  );
});