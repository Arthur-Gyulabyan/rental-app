import db from '../../infrastructure/db/index.js';
import Inspection from '../entity/Inspection.js';
import { v4 as uuid } from 'uuid';

class ScheduleInspectionCommand {
  static async execute({ assignedToEmail, locationNotes, nextActorEmail, scheduledAt, turnoverId }) {
    const turnover = await db.findById('Turnover', turnoverId);
    if (!turnover) throw new Error('Turnover not found.');

    if (turnover.vacatedAt && new Date(scheduledAt) > new Date(turnover.vacatedAt)) {
      throw new Error('Inspection must be scheduled before or at move-out.');
    }

    const inspection = new Inspection({
      id: uuid(),
      assignedToEmail,
      locationNotes,
      nextActorEmail,
      scheduledAt,
      turnoverId
    });

    await db.insert('Inspection', inspection.toJSON());
    return inspection.toJSON();
  }
}

export default ScheduleInspectionCommand;