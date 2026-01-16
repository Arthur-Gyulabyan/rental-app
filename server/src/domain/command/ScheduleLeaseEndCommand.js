import db from '../../infrastructure/db/index.js';
import Lease from '../entity/Lease.js';

class ScheduleLeaseEndCommand {
  static async execute(data) {
    const lease = new Lease(data);
    const result = await db.update('Lease', data.id, lease);
    if (!result) throw new Error('Lease not found');
    return result;
  }
}

export default ScheduleLeaseEndCommand;