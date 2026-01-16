import { v4 as uuid } from 'uuid';
import WorkOrder from '../entity/WorkOrder.js';
import db from '../../infrastructure/db/index.js';

class CreateWorkOrderCommand {
  static async execute(data) {
    const id = uuid();
    const workOrder = new WorkOrder({ ...data, id });
    await db.insert('Work Order', workOrder);
    return workOrder;
  }
}

export default CreateWorkOrderCommand;