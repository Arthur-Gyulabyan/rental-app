import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TODO_DESCRIPTION = 'Test todo description';
const CURRENT_DATE = '2026-01-14T13:41:28.125Z';

let apiResponse;
let renovationCaseId;

const feature = loadFeature(path.resolve(__dirname, 'create-work-order-given-a-renovation-plan-requiring-work-has-been-selected-when.feature'));

defineFeature(feature, test => {
  test(
    'Given a renovation plan requiring work has been selected, When the ConstrDept creates a work order with scope, materials and access details, Then Work Order Created is recorded linked to the turnover and renovation case.',
    ({ given, when, then }) => {
      given('a renovation plan requiring work has been selected', async () => {
        const propRes = await request(app)
          .post('/api/v1/create-property')
          .send({
            'name': TODO_DESCRIPTION,
            'address': TODO_DESCRIPTION,
            'managerName': TODO_DESCRIPTION,
            'managerEmail': 'pm@rentco.com',
            'unitsCount': '10'
          });

        const aptRes = await request(app)
          .post('/api/v1/create-apartment')
          .send({
            'propertyId': propRes.body.id,
            'unitNumber': '101',
            'floorAreaSqm': '75',
            'bedrooms': '2',
            'status': 'Occupied'
          });

        const leaseRes = await request(app)
          .post('/api/v1/create-lease')
          .send({
            'apartmentId': aptRes.body.id,
            'currentRent': '1200',
            'tenantName': TODO_DESCRIPTION
          });

        const turnRes = await request(app)
          .post('/api/v1/create-turnover')
          .send({
            'leaseId': leaseRes.body.id,
            'targetReadyDate': CURRENT_DATE
          });

        const renoRes = await request(app)
          .post('/api/v1/request-renovation-estimate')
          .send({
            'turnoverId': turnRes.body.id,
            'requestedLevels': 'good',
            'scopeNotes': TODO_DESCRIPTION,
            'targetReadyDate': CURRENT_DATE
          });

        renovationCaseId = renoRes.body.id;

        await request(app)
          .post('/api/v1/select-renovation-plan')
          .send({
            'id': renovationCaseId,
            'selectedLevel': 'good',
            'budgetApproved': 'true',
            'expectedCompletionDate': CURRENT_DATE,
            'projectedRent': '1300',
            'decisionReason': TODO_DESCRIPTION
          });
      });

      when('the ConstrDept creates a work order with scope, materials and access details', async () => {
        apiResponse = await request(app)
          .post('/api/v1/create-work-order')
          .send({
            'renovationCaseId': renovationCaseId,
            'scopeSummary': TODO_DESCRIPTION,
            'materialsList': TODO_DESCRIPTION,
            'accessDetails': TODO_DESCRIPTION,
            'nextActorEmail': 'crew@rentco.com'
          });
      });

      then('Work Order Created is recorded linked to the turnover and renovation case', async () => {
        expect(apiResponse.status).toBe(200);
        expect(apiResponse.body).toHaveProperty('id');
        expect(apiResponse.body.renovationCaseId).toBe(renovationCaseId);
        expect(apiResponse.body.scopeSummary).toBe(TODO_DESCRIPTION);
        expect(apiResponse.body.materialsList).toBe(TODO_DESCRIPTION);
        expect(apiResponse.body.accessDetails).toBe(TODO_DESCRIPTION);
      });
    }
  );
});