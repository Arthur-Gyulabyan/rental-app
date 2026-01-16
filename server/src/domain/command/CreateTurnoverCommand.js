import db from '../../infrastructure/db/index.js';
import Lease from '../entity/Lease.js';
import Turnover from '../entity/Turnover.js';
import { v4 as uuid } from 'uuid';

class CreateTurnoverCommand {
  static async execute({ leaseId, targetReadyDate, nextActorEmail }) {
    const lease = await db.findById('Lease', leaseId);
    if (!lease || !lease.endDate) {
      throw new Error('Lease must have an end date scheduled');
    }

    const turnovers = await db.findAll('Turnover');
    if (turnovers.some(t => t.leaseId === leaseId)) {
      throw new Error('Turnover already exists for this lease');
    }

    const turnover = new Turnover({
      id: uuid(),
      leaseId,
      targetReadyDate,
      nextActorEmail
    });

    await db.insert('Turnover', turnover.toJSON());
    return turnover.toJSON();
  }
}

export default CreateTurnoverCommand;