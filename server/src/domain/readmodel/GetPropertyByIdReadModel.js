import db from '../../infrastructure/db/index.js';

class GetPropertyByIdReadModel {
  static async query(id) {
    return await db.findById('Property', id);
  }
}

export default GetPropertyByIdReadModel;