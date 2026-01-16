import Lease from '../entity/Lease.js';
import db from '../../infrastructure/db/index.js';

class MarkLeaseEndedCommand {
  static async execute(data) {
    const existing = await db.findById('Lease', data.id);
    if (!existing) return null;

    const today = new Date().toISOString().split('T')[0];
    if (existing.endDate !== today) {
      throw new Error('Lease can only be ended on the scheduled end date.');
    }

    const lease = new Lease({
      ...existing,
      ...data
    });

    return await db.update('Lease', data.id, lease.toJSON());
  }
}

export default MarkLeaseEndedCommand;