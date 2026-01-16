import db from '../../infrastructure/db/index.js';
import Inspection from '../entity/Inspection.js';

class RescheduleInspectionCommand {
  static async execute({ id, scheduledAt, assignedToEmail, rescheduledReason }) {
    const existing = await db.findById('Inspection', id);
    if (!existing) return null;

    const inspection = new Inspection({
      ...existing,
      scheduledAt,
      assignedToEmail: assignedToEmail !== undefined ? assignedToEmail : existing.assignedToEmail,
      rescheduledReason: rescheduledReason !== undefined ? rescheduledReason : existing.rescheduledReason
    });

    return await db.update('Inspection', id, inspection.toJSON());
  }
}

export default RescheduleInspectionCommand;