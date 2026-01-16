import db from '../../infrastructure/db/index.js';
import Inspection from '../entity/Inspection.js';

class CancelInspectionCommand {
  static async execute({ id, cancellationReason }) {
    const existing = await db.findById('Inspection', id);
    if (!existing) throw new Error('Inspection not found');
    const inspection = new Inspection({ ...existing, cancellationReason });
    const updated = await db.update('Inspection', id, inspection.toJSON());
    await db.remove('Inspection', id);
    return updated;
  }
}

export default CancelInspectionCommand;