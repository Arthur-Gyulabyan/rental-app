import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const feature = loadFeature(path.resolve(__dirname, 'pass-final-inspection-renovation-or-repairs-are-complete-and-a-final-inspection-appointment.feature'));

const TODO_DESCRIPTION = 'Test todo description';
const CURRENT_DATE = '2026-01-14T13:41:28.152Z';

let apiResponse;
let inspectionId;

defineFeature(feature, test => {
  test(
    'Given renovation or repairs are complete and a final inspection appointment exists, When the Inspector verifies all items meet standards and no defects remain, Then Final Inspection Passed is recorded with inspector sign-off.',
    ({ given, when, then }) => {
      given('renovation or repairs are complete and a final inspection appointment exists', async () => {
        const propRes = await request(app).post('/api/v1/create-property').send({
          "name": 'Maple Court',
          "address": '12 Main St',
          "managerName": 'Jordan Alvarez',
          "managerEmail": 'pm@rentco.com',
          "unitsCount": '120'
        });

        const aptRes = await request(app).post('/api/v1/create-apartment').send({
          "propertyId": propRes.body.id,
          "unitNumber": '22B',
          "floorAreaSqm": '62',
          "bedrooms": '2',
          "status": 'Occupied'
        });

        const leaseRes = await request(app).post('/api/v1/create-lease').send({
          "apartmentId": aptRes.body.id,
          "currentRent": '1450',
          "tenantName": 'Alexandra Nguyen'
        });

        const turnoverRes = await request(app).post('/api/v1/create-turnover').send({
          "leaseId": leaseRes.body.id,
          "targetReadyDate": '2025-10-15',
          "nextActorEmail": 'inspections@rentco.com'
        });

        const inspRes = await request(app).post('/api/v1/schedule-inspection').send({
          "turnoverId": turnoverRes.body.id,
          "scheduledAt": '2025-09-28T09:00',
          "assignedToEmail": 'inspector1@rentco.com',
          "locationNotes": 'Basement entry',
          "nextActorEmail": 'tenant@ex.com'
        });

        inspectionId = inspRes.body.id;
      });

      when('the Inspector verifies all items meet standards and no defects remain', async () => {
        apiResponse = await request(app).post('/api/v1/pass-final-inspection').send({
          "id": inspectionId,
          "passedAt": CURRENT_DATE,
          "inspectorName": 'A. Rivera',
          "certificateUrl": 'https://docs.io/c9001',
          "nextActorEmail": 'tenant@ex.com'
        });
      });

      then('Final Inspection Passed is recorded with inspector sign-off.', async () => {
        expect(apiResponse.status).toBe(200);
        expect(apiResponse.body.id).toBe(inspectionId);
        expect(apiResponse.body.passedAt).toBe(CURRENT_DATE);
        expect(apiResponse.body.inspectorName).toBe('A. Rivera');
      });
    }
  );
});