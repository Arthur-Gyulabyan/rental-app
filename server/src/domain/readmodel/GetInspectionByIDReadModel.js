import db from '../../infrastructure/db/index.js';

class GetInspectionByIDReadModel {
  static async query(id) {
    return await db.findById('Inspection', id);
  }
}

export default GetInspectionByIDReadModel;