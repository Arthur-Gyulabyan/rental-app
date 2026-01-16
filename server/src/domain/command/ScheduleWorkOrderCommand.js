import db from '../../infrastructure/db/index.js';
import WorkOrder from '../entity/WorkOrder.js';

class ScheduleWorkOrderCommand {
  static async execute({ id, startDate, endDate, crewName, assignedToEmail, materialsReady, nextActorEmail }) {
    const existing = await db.findById('Work Order', id);
    if (!existing) {
      throw new Error('Work Order not found');
    }

    const workOrder = new WorkOrder({
      ...existing,
      startDate,
      endDate,
      crewName,
      assignedToEmail,
      materialsReady,
      nextActorEmail
    });

    const result = await db.update('Work Order', id, workOrder.toJSON());
    return result;
  }
}

export default ScheduleWorkOrderCommand;