import db from '../../infrastructure/db/index.js';
import Inspection from '../entity/Inspection.js';

class CompleteInspectionCommand {
  static async execute(data) {
    const existing = await db.findById('Inspection', data.id);
    if (!existing || existing.turnoverId !== data.turnoverId) {
      throw new Error('Inspection not found');
    }
    const inspection = new Inspection({ ...existing, ...data });
    return await db.update('Inspection', data.id, inspection.toJSON());
  }
}

export default CompleteInspectionCommand;