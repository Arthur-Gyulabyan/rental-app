import db from '../../infrastructure/db/index.js';

class GetWorkOrderByIDReadModel {
  static async query(id) {
    return await db.findById('Work Order', id);
  }
}

export default GetWorkOrderByIDReadModel;