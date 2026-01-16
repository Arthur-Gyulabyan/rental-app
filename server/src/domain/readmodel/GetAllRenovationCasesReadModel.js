import db from '../../infrastructure/db/index.js';

class GetAllRenovationCasesReadModel {
  static async query() {
    const records = await db.findAll('Renovation Case');
    return records
      .filter((item) => !item.costGood)
      .map((item) => ({
        id: item.id,
        turnoverId: item.turnoverId,
        requestedLevels: item.requestedLevels,
        scopeNotes: item.scopeNotes,
        targetReadyDate: item.targetReadyDate
      }));
  }
}

export default GetAllRenovationCasesReadModel;