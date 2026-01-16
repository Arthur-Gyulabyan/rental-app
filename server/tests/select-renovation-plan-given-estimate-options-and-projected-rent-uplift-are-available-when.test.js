import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TODO_DESCRIPTION = 'Test todo description';
const CURRENT_DATE = '2026-01-14T13:41:28.119Z';

let apiResponse;
let renovationCaseId;

const feature = loadFeature(path.resolve(__dirname, 'select-renovation-plan-given-estimate-options-and-projected-rent-uplift-are-available-when.feature'));

defineFeature(feature, test => {
  test(
    'Given estimate options and projected rent uplift are available, When the PropertyMgr selects one plan level or chooses no renovation, Then Renovation Plan Selected is recorded with the chosen level, budget and expected completion window.',
    ({ given, when, then }) => {
      given('estimate options and projected rent uplift are available', async () => {
        const resProp = await request(app).post('/api/v1/create-property').send({
          "name": 'Maple Court',
          "address": '12 Main St',
          "managerName": 'Jordan Alvarez',
          "managerEmail": 'pm@rentco.com',
          "unitsCount": '120'
        });
        const resApt = await request(app).post('/api/v1/create-apartment').send({
          "propertyId": resProp.body.id,
          "unitNumber": '22B',
          "floorAreaSqm": '62',
          "bedrooms": '2',
          "status": 'Occupied'
        });
        const resLease = await request(app).post('/api/v1/create-lease').send({
          "apartmentId": resApt.body.id,
          "currentRent": '1450',
          "tenantName": 'Alexandra Nguyen'
        });
        const resTurn = await request(app).post('/api/v1/create-turnover').send({
          "leaseId": resLease.body.id,
          "targetReadyDate": '2025-10-15'
        });
        const resCase = await request(app).post('/api/v1/request-renovation-estimate').send({
          "turnoverId": resTurn.body.id,
          "requestedLevels": 'good,better',
          "scopeNotes": 'Paint and bath reseal',
          "targetReadyDate": '2025-10-20',
          "nextActorEmail": 'constr@rentco.com'
        });
        renovationCaseId = resCase.body.id;
        await request(app).post('/api/v1/provide-renovation-estimate').send({
          "id": renovationCaseId,
          "costGood": '1200',
          "costBetter": '1800',
          "costPremium": '3000',
          "leadDaysGood": '5',
          "leadDaysBetter": '8',
          "leadDaysPremium": '12',
          "nextActorEmail": 'pm@rentco.com'
        });
      });

      when('the PropertyMgr selects one plan level or chooses no renovation', async () => {
        apiResponse = await request(app).post('/api/v1/select-renovation-plan').send({
          "id": renovationCaseId,
          "selectedLevel": 'good',
          "budgetApproved": 'true',
          "expectedCompletionDate": '2025-10-18',
          "projectedRent": '1550',
          "decisionReason": 'ROI ok',
          "nextActorEmail": 'constr@rentco.com'
        });
      });

      then('Renovation Plan Selected is recorded with the chosen level, budget and expected completion window.', async () => {
        expect(apiResponse.status).toBe(200);
        expect(apiResponse.body.selectedLevel).toBe('good');
        expect(apiResponse.body.budgetApproved).toBe('true');
        expect(apiResponse.body.expectedCompletionDate).toBe('2025-10-18');
      });
    }
  );
});