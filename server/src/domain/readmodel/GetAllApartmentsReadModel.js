import db from '../../infrastructure/db/index.js';

class GetAllApartmentsReadModel {
  static async query() {
    return await db.findAll('Inspection');
  }
}

export default GetAllApartmentsReadModel;