import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TODO_DESCRIPTION = 'Test todo description';
const CURRENT_DATE = '2026-01-14T13:41:28.180Z';

let apiResponse;
let apartmentId;

const feature = loadFeature(path.resolve(__dirname, 'create-lease-given-a-specific-apartment-is-available-for-leasing-status-is.feature'));

defineFeature(feature, test => {
  test(
    'Given a specific apartment is available for leasing (status is \'Vacant\' or \'Ready\') and the PropertyMgr provides tenant details, lease start date, end date, and rent amount, When the PropertyMgr submits Create Lease, Then Lease Created is recorded with a new leaseId for the apartment and tenant, and the apartment\'s status changes to \'Occupied\'.',
    ({ given, when, then }) => {
      given('a specific apartment is available for leasing (status is \'Vacant\' or \'Ready\') and the PropertyMgr provides tenant details, lease start date, end date, and rent amount', async () => {
        const propertyResponse = await request(app)
          .post('/api/v1/create-property')
          .send({
            "name": 'Maple Court',
            "address": '12 Main St',
            "managerName": 'Jordan Alvarez',
            "managerEmail": 'pm@rentco.com',
            "unitsCount": '120'
          });

        const aptResponse = await request(app)
          .post('/api/v1/create-apartment')
          .send({
            "propertyId": propertyResponse.body.id,
            "unitNumber": '22B',
            "floorAreaSqm": '62',
            "bedrooms": '2',
            "status": 'Vacant'
          });

        apartmentId = aptResponse.body.id;
      });

      when('the PropertyMgr submits Create Lease', async () => {
        apiResponse = await request(app)
          .post('/api/v1/create-lease')
          .send({
            "apartmentId": apartmentId,
            "currentRent": '1450',
            "nextActorEmail": 'ops@rentco.com',
            "tenantName": TODO_DESCRIPTION
          });
      });

      then('Lease Created is recorded with a new leaseId for the apartment and tenant, and the apartment\'s status changes to \'Occupied\'.', async () => {
        expect(apiResponse.status).toBe(200);
        expect(apiResponse.body.id).toBeDefined();
        expect(apiResponse.body.apartmentId).toBe(apartmentId);
        expect(apiResponse.body.tenantName).toBe(TODO_DESCRIPTION);

        const updatedAptResponse = await request(app)
          .get(`/api/v1/get-apartment-by-id/${apartmentId}`);

        expect(updatedAptResponse.status).toBe(200);
        expect(updatedAptResponse.body.status).toBe('Occupied');
      });
    }
  );
});