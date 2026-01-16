import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TODO_DESCRIPTION = 'Test todo description';
const CURRENT_DATE = '2026-01-14T13:41:28.105Z';

let apiResponse;
let turnoverId;

const feature = loadFeature(path.resolve(__dirname, 'request-renovation-estimate-given-a-turnover-with-a-damage-report-or-an.feature'));

defineFeature(feature, test => {
  test(
    'Given a turnover with a damage report or an upgrade need and apartment profile data, When the PropertyMgr requests a renovation estimate including levels none, good, better and premium, Then Renovation Estimate Requested is recorded and the construction department is notified.',
    ({ given, when, then }) => {
      given('a turnover with a damage report or an upgrade need and apartment profile data', async () => {
        const propertyRes = await request(app)
          .post('/api/v1/create-property')
          .send({
            'name': 'Maple Court',
            'address': '12 Main St',
            'managerName': 'Jordan Alvarez',
            'managerEmail': 'pm@rentco.com',
            'unitsCount': '120'
          });
        const propertyId = propertyRes.body.id;

        const apartmentRes = await request(app)
          .post('/api/v1/create-apartment')
          .send({
            'propertyId': propertyId,
            'unitNumber': '22B',
            'floorAreaSqm': '62',
            'bedrooms': '2',
            'status': 'Occupied'
          });
        const apartmentId = apartmentRes.body.id;

        const leaseRes = await request(app)
          .post('/api/v1/create-lease')
          .send({
            'apartmentId': apartmentId,
            'currentRent': '1450',
            'tenantName': 'Alexandra Nguyen'
          });
        const leaseId = leaseRes.body.id;

        const turnoverRes = await request(app)
          .post('/api/v1/create-turnover')
          .send({
            'leaseId': leaseId,
            'targetReadyDate': '2025-10-15',
            'nextActorEmail': 'inspections@rentco.com'
          });
        turnoverId = turnoverRes.body.id;

        const inspectionRes = await request(app)
          .post('/api/v1/schedule-inspection')
          .send({
            'turnoverId': turnoverId,
            'scheduledAt': CURRENT_DATE,
            'assignedToEmail': 'inspector1@rentco.com'
          });
        const inspectionId = inspectionRes.body.id;

        await request(app)
          .post('/api/v1/create-renovation-report')
          .send({
            'inspectionId': inspectionId,
            'damageSeverity': 'medium',
            'estimatedRepairCost': '850',
            'damageSummary': TODO_DESCRIPTION,
            'nextActorEmail': 'constr@rentco.com'
          });
      });

      when('the PropertyMgr requests a renovation estimate including levels none, good, better and premium', async () => {
        apiResponse = await request(app)
          .post('/api/v1/request-renovation-estimate')
          .send({
            'turnoverId': turnoverId,
            'requestedLevels': 'none,good,better,premium',
            'scopeNotes': TODO_DESCRIPTION,
            'targetReadyDate': '2025-10-20',
            'nextActorEmail': 'constr@rentco.com'
          });
      });

      then('Renovation Estimate Requested is recorded and the construction department is notified.', async () => {
        expect(apiResponse.status).toBe(200);
        expect(apiResponse.body).toHaveProperty('id');
        expect(apiResponse.body.turnoverId).toBe(turnoverId);
      });
    }
  );
});