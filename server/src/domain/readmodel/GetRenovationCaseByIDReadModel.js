import db from '../../infrastructure/db/index.js';

class GetRenovationCaseByIDReadModel {
  static async query(id) {
    return await db.findById('Work Order', id);
  }
}

export default GetRenovationCaseByIDReadModel;