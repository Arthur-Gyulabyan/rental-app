import db from '../../infrastructure/db/index.js';
import WorkOrder from '../entity/WorkOrder.js';

class CancelWorkOrderCommand {
  static async execute({ id, cancellationReason }) {
    const data = await db.findById('Work Order', id);
    if (!data) return null;
    if (data.actualEndDate) throw new Error('Work order is already completed');
    const workOrder = new WorkOrder({
      ...data,
      cancellationReason,
      startDate: null,
      endDate: null
    });
    return await db.update('Work Order', id, workOrder.toJSON());
  }
}

export default CancelWorkOrderCommand;