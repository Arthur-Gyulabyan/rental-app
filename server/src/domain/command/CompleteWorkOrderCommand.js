import db from '../../infrastructure/db/index.js';
import WorkOrder from '../entity/WorkOrder.js';

class CompleteWorkOrderCommand {
  static async execute(data) {
    const existing = await db.findById('Work Order', data.id);
    if (!existing) return null;

    const workOrder = new WorkOrder({ ...existing, ...data });
    return await db.update('Work Order', data.id, workOrder);
  }
}

export default CompleteWorkOrderCommand;