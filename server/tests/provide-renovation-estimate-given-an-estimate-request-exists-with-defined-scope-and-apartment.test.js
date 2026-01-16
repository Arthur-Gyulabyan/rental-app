import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TODO_DESCRIPTION = 'Test todo description';
const CURRENT_DATE = '2026-01-14T13:41:28.113Z';

let apiResponse;
let renovationCaseId;

const feature = loadFeature(path.resolve(__dirname, 'provide-renovation-estimate-given-an-estimate-request-exists-with-defined-scope-and-apartment.feature'));

defineFeature(feature, test => {
  test(
    'Given an estimate request exists with defined scope and apartment details, When the ConstrDept submits costs, lead times and assumptions for each renovation level, Then Renovation Estimate Provided is recorded with the option set.',
    ({ given, when, then }) => {
      given('an estimate request exists with defined scope and apartment details', async () => {
        const propertyRes = await request(app)
          .post('/api/v1/create-property')
          .send({
            'name': TODO_DESCRIPTION,
            'address': '12 Main St',
            'managerName': 'Jordan Alvarez',
            'managerEmail': 'pm@rentco.com',
            'unitsCount': '120'
          });

        const apartmentRes = await request(app)
          .post('/api/v1/create-apartment')
          .send({
            'propertyId': propertyRes.body.id,
            'unitNumber': '22B',
            'floorAreaSqm': '62',
            'bedrooms': '2',
            'status': 'Occupied'
          });

        const leaseRes = await request(app)
          .post('/api/v1/create-lease')
          .send({
            'apartmentId': apartmentRes.body.id,
            'currentRent': '1450',
            'tenantName': 'Alexandra Nguyen'
          });

        const turnoverRes = await request(app)
          .post('/api/v1/create-turnover')
          .send({
            'leaseId': leaseRes.body.id,
            'targetReadyDate': CURRENT_DATE
          });

        const estimateRequestRes = await request(app)
          .post('/api/v1/request-renovation-estimate')
          .send({
            'turnoverId': turnoverRes.body.id,
            'requestedLevels': 'good,better',
            'scopeNotes': TODO_DESCRIPTION,
            'targetReadyDate': CURRENT_DATE
          });

        renovationCaseId = estimateRequestRes.body.id;
      });

      when('the ConstrDept submits costs, lead times and assumptions for each renovation level', async () => {
        apiResponse = await request(app)
          .post('/api/v1/provide-renovation-estimate')
          .send({
            'id': renovationCaseId,
            'costGood': '1200',
            'costBetter': '1800',
            'costPremium': '3000',
            'leadDaysGood': '5',
            'leadDaysBetter': '8',
            'leadDaysPremium': '12',
            'nextActorEmail': 'constr@rentco.com'
          });
      });

      then('Renovation Estimate Provided is recorded with the option set.', async () => {
        expect(apiResponse.status).toBe(200);
        expect(apiResponse.body.costGood).toBe('1200');
        expect(apiResponse.body.costBetter).toBe('1800');
        expect(apiResponse.body.costPremium).toBe('3000');
      });
    }
  );
});