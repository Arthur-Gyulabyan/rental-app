import db from '../../infrastructure/db/index.js';
import Turnover from '../entity/Turnover.js';

class CompleteTurnoverCommand {
  static async execute({ id, readyToRentDate, listingReady, marketingEmail, notes }) {
    const existing = await db.findById('Turnover', id);
    if (!existing) {
      const error = new Error('Turnover not found');
      error.status = 404;
      throw error;
    }

    if (!existing.finalInspectionPassedAt) {
      throw new Error('Final inspection has not passed');
    }

    if (existing.openWorkOrdersCount !== '0') {
      throw new Error('There are open work orders');
    }

    const updatedTurnover = new Turnover({
      ...existing,
      readyToRentDate,
      listingReady,
      marketingEmail,
      notes
    });

    return await db.update('Turnover', id, updatedTurnover.toJSON());
  }
}

export default CompleteTurnoverCommand;