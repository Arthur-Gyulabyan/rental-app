import db from '../../infrastructure/db/index.js';

class GetApartmentByIDReadModel {
  static async query(id) {
    return await db.findById('Apartment', id);
  }
}

export default GetApartmentByIDReadModel;