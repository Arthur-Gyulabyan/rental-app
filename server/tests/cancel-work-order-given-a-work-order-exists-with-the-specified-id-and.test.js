import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TODO_DESCRIPTION = 'Test todo description';
const CURRENT_DATE = '2026-01-14T13:41:28.224Z';

let apiResponse;
let workOrderId;

const feature = loadFeature(path.resolve(__dirname, 'cancel-work-order-given-a-work-order-exists-with-the-specified-id-and.feature'));

defineFeature(feature, test => {
  test(
    'Given a work order exists with the specified id and has not been completed, When the ConstrDept cancels the work order with a reason, Then Work Order Cancelled is recorded and the work order is removed from the schedule.',
    ({ given, when, then }) => {
      given('a work order exists with the specified id and has not been completed', async () => {
        const propRes = await request(app)
          .post('/api/v1/create-property')
          .send({
            'name': 'Maple Court',
            'address': '12 Main St',
            'managerName': 'Jordan Alvarez',
            'managerEmail': 'pm@rentco.com',
            'unitsCount': '120'
          });
        const propertyId = propRes.body.id;

        const aptRes = await request(app)
          .post('/api/v1/create-apartment')
          .send({
            'propertyId': propertyId,
            'unitNumber': '22B',
            'floorAreaSqm': '62',
            'bedrooms': '2',
            'status': 'Occupied'
          });
        const apartmentId = aptRes.body.id;

        const leaseRes = await request(app)
          .post('/api/v1/create-lease')
          .send({
            'apartmentId': apartmentId,
            'currentRent': '1450',
            'tenantName': 'Alexandra Nguyen'
          });
        const leaseId = leaseRes.body.id;

        const toRes = await request(app)
          .post('/api/v1/create-turnover')
          .send({
            'leaseId': leaseId,
            'targetReadyDate': CURRENT_DATE
          });
        const turnoverId = toRes.body.id;

        const renoRes = await request(app)
          .post('/api/v1/request-renovation-estimate')
          .send({
            'turnoverId': turnoverId,
            'requestedLevels': 'good',
            'scopeNotes': 'Notes',
            'targetReadyDate': CURRENT_DATE
          });
        const renovationCaseId = renoRes.body.id;

        const woRes = await request(app)
          .post('/api/v1/create-work-order')
          .send({
            'renovationCaseId': renovationCaseId,
            'scopeSummary': 'Paint walls',
            'materialsList': 'Paint'
          });
        workOrderId = woRes.body.id;
      });

      when('the ConstrDept cancels the work order with a reason', async () => {
        apiResponse = await request(app)
          .post('/api/v1/cancel-work-order')
          .send({
            'id': workOrderId,
            'cancellationReason': TODO_DESCRIPTION
          });
      });

      then('Work Order Cancelled is recorded and the work order is removed from the schedule.', async () => {
        expect(apiResponse.status).toBe(200);
        expect(apiResponse.body.id).toBe(workOrderId);
        expect(apiResponse.body.cancellationReason).toBe(TODO_DESCRIPTION);
      });
    }
  );
});