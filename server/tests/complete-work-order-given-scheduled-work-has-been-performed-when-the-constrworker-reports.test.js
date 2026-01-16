import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TODO_DESCRIPTION = 'Test todo description';
const CURRENT_DATE = '2026-01-14T13:41:28.143Z';

let apiResponse;
let workOrderId;

const feature = loadFeature(path.resolve(__dirname, 'complete-work-order-given-scheduled-work-has-been-performed-when-the-constrworker-reports.feature'));

defineFeature(feature, test => {
  test(
    'Given scheduled work has been performed, When the ConstrWorker reports completion with actual dates, notes and photos, Then Work Order Completed is recorded and any variances are captured.',
    ({ given, when, then }) => {
      given('scheduled work has been performed', async () => {
        const propRes = await request(app).post('/api/v1/create-property').send({
          'name': 'Maple Court',
          'address': '12 Main St',
          'managerName': 'Jordan Alvarez',
          'managerEmail': 'pm@rentco.com',
          'unitsCount': '120'
        });

        const aptRes = await request(app).post('/api/v1/create-apartment').send({
          'propertyId': propRes.body.id,
          'unitNumber': '22B',
          'floorAreaSqm': '62',
          'bedrooms': '2',
          'status': 'Occupied'
        });

        const leaseRes = await request(app).post('/api/v1/create-lease').send({
          'apartmentId': aptRes.body.id,
          'currentRent': '1450',
          'tenantName': 'Alexandra Nguyen'
        });

        const toRes = await request(app).post('/api/v1/create-turnover').send({
          'leaseId': leaseRes.body.id,
          'targetReadyDate': '2025-10-15'
        });

        const renoRes = await request(app).post('/api/v1/request-renovation-estimate').send({
          'turnoverId': toRes.body.id,
          'requestedLevels': 'good',
          'scopeNotes': TODO_DESCRIPTION,
          'targetReadyDate': '2025-10-20'
        });

        const woRes = await request(app).post('/api/v1/create-work-order').send({
          'renovationCaseId': renoRes.body.id,
          'scopeSummary': TODO_DESCRIPTION,
          'materialsList': 'Standard'
        });

        workOrderId = woRes.body.id;

        await request(app).post('/api/v1/schedule-work-order').send({
          'id': workOrderId,
          'startDate': '2025-10-05',
          'endDate': '2025-10-10',
          'crewName': 'Crew Alpha',
          'assignedToEmail': 'lead1@rentco.com',
          'materialsReady': 'true'
        });
      });

      when('the ConstrWorker reports completion with actual dates, notes and photos', async () => {
        apiResponse = await request(app)
          .post('/api/v1/complete-work-order')
          .send({
            "id": workOrderId,
            "actualStartDate": CURRENT_DATE,
            "actualEndDate": CURRENT_DATE,
            "completionNotes": TODO_DESCRIPTION,
            "photosUrl": 'https://pics.io/wo8001',
            "varianceNotes": TODO_DESCRIPTION
          });
      });

      then('Work Order Completed is recorded and any variances are captured.', async () => {
        expect(apiResponse.status).toBe(200);
        expect(apiResponse.body.id).toBe(workOrderId);
        expect(apiResponse.body.actualEndDate).toBe(CURRENT_DATE);
        expect(apiResponse.body.varianceNotes).toBe(TODO_DESCRIPTION);
      });
    }
  );
});