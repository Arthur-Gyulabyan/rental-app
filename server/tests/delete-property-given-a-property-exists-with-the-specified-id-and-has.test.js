import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TODO_DESCRIPTION = 'Test todo description';
const CURRENT_DATE = '2026-01-14T13:41:28.192Z';

let apiResponse;
let propertyId;

const feature = loadFeature(path.resolve(__dirname, 'delete-property-given-a-property-exists-with-the-specified-id-and-has.feature'));

defineFeature(feature, test => {
  test(
    'Given a property exists with the specified id and has no apartments, When the PropertyMgr deletes the property, Then Property Deleted is recorded and the property is removed from the system.',
    ({ given, when, then }) => {
      given('a property exists with the specified id and has no apartments', async () => {
        const response = await request(app)
          .post('/api/v1/create-property')
          .send({
            'name': TODO_DESCRIPTION,
            'address': TODO_DESCRIPTION,
            'managerName': TODO_DESCRIPTION,
            'managerEmail': TODO_DESCRIPTION,
            'unitsCount': '120'
          });
        propertyId = response.body.id;
      });

      when('the PropertyMgr deletes the property', async () => {
        apiResponse = await request(app)
          .post('/api/v1/delete-property')
          .send({
            'id': propertyId
          });
      });

      then('Property Deleted is recorded and the property is removed from the system.', async () => {
        expect(apiResponse.status).toBe(200);
        const getResponse = await request(app)
          .get('/api/v1/get-property-by-id/' + propertyId);
        expect(getResponse.status).toBe(404);
      });
    }
  );
});