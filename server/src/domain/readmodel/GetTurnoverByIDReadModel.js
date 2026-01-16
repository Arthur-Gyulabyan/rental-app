import db from '../../infrastructure/db/index.js';

class GetTurnoverByIDReadModel {
  static async query(id) {
    const data = await db.findById('Turnover', id);
    if (!data) return null;
    return {
      id: data.id,
      checklist: data.checklist
    };
  }
}

export default GetTurnoverByIDReadModel;