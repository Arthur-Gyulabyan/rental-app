import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TODO_DESCRIPTION = 'Test todo description';
const CURRENT_DATE = '2026-01-14T13:41:28.212Z';

let apiResponse;
let inspectionId;

const feature = loadFeature(path.resolve(__dirname, 'reschedule-inspection-given-a-scheduled-inspection-exists-with-the-specified-id-when.feature'));

defineFeature(feature, test => {
  test(
    'Given a scheduled inspection exists with the specified id, When the PropertyMgr reschedules the inspection with a new date, time and optionally a different inspector, Then Inspection Rescheduled is recorded with the updated schedule.',
    ({ given, when, then }) => {
      given('a scheduled inspection exists with the specified id', async () => {
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

        const leaseRes = await request(app)
          .post('/api/v1/create-lease')
          .send({
            "apartmentId": apartmentRes.body.id,
            "currentRent": '1450',
            "tenantName": 'Alexandra Nguyen'
          });

        const turnoverRes = await request(app)
          .post('/api/v1/create-turnover')
          .send({
            "leaseId": leaseRes.body.id,
            "targetReadyDate": CURRENT_DATE
          });

        const inspectionRes = await request(app)
          .post('/api/v1/schedule-inspection')
          .send({
            "turnoverId": turnoverRes.body.id,
            "scheduledAt": CURRENT_DATE,
            "assignedToEmail": 'inspector1@rentco.com',
            "locationNotes": TODO_DESCRIPTION,
            "nextActorEmail": 'tenant@ex.com'
          });

        inspectionId = inspectionRes.body.id;
      });

      when('the PropertyMgr reschedules the inspection with a new date, time and optionally a different inspector', async () => {
        apiResponse = await request(app)
          .post('/api/v1/reschedule-inspection')
          .send({
            "id": inspectionId,
            "scheduledAt": CURRENT_DATE,
            "assignedToEmail": 'inspector2@rentco.com',
            "rescheduledReason": TODO_DESCRIPTION
          });
      });

      then('Inspection Rescheduled is recorded with the updated schedule', async () => {
        expect(apiResponse.status).toBe(200);
        expect(apiResponse.body).toHaveProperty('id', inspectionId);
        expect(apiResponse.body).toHaveProperty('scheduledAt', CURRENT_DATE);
        expect(apiResponse.body).toHaveProperty('assignedToEmail', 'inspector2@rentco.com');
        expect(apiResponse.body).toHaveProperty('rescheduledReason', TODO_DESCRIPTION);
      });
    }
  );
});