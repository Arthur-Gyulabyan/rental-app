import db from '../../infrastructure/db/index.js';
import Turnover from '../entity/Turnover.js';

class RecordApartmentVacatedCommand {
  static async execute({ id, vacatedAt, keysReturned, notes, nextActorEmail }) {
    const existing = await db.findById('Turnover', id);
    if (!existing) throw new Error('Turnover not found');

    const turnover = new Turnover({
      ...existing,
      vacatedAt,
      keysReturned,
      notes,
      nextActorEmail
    });

    return await db.update('Turnover', id, turnover.toJSON());
  }
}

export default RecordApartmentVacatedCommand;