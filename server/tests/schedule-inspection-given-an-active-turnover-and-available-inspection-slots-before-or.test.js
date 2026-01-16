import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TODO_DESCRIPTION = 'Test todo description';
const CURRENT_DATE = '2026-01-14T13:41:28.063Z';

let apiResponse;
let turnoverId;

const feature = loadFeature(path.resolve(__dirname, 'schedule-inspection-given-an-active-turnover-and-available-inspection-slots-before-or.feature'));

defineFeature(feature, test => {
  test(
    'Given an active turnover and available inspection slots before or at move-out, When the PropertyMgr schedules the inspection with a date, time and inspector, Then Inspection Scheduled is recorded with the appointment details.',
    ({ given, when, then }) => {
      given('an active turnover and available inspection slots before or at move-out', async () => {
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
            'targetReadyDate': '2026-02-15'
          });

        turnoverId = turnoverRes.body.id;
      });

      when('the PropertyMgr schedules the inspection with a date, time and inspector', async () => {
        apiResponse = await request(app)
          .post('/api/v1/schedule-inspection')
          .send({
            'turnoverId': turnoverId,
            'scheduledAt': CURRENT_DATE,
            'assignedToEmail': 'inspector1@rentco.com',
            'locationNotes': 'Basement entry',
            'nextActorEmail': 'tenant@ex.com'
          });
      });

      then('Inspection Scheduled is recorded with the appointment details.', async () => {
        expect(apiResponse.status).toBe(200);
        expect(apiResponse.body.turnoverId).toBe(turnoverId);
        expect(apiResponse.body.scheduledAt).toBe(CURRENT_DATE);
        expect(apiResponse.body.assignedToEmail).toBe('inspector1@rentco.com');
        expect(apiResponse.body).toHaveProperty('id');
      });
    }
  );
});