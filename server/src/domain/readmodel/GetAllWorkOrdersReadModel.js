import db from '../../infrastructure/db/index.js';

class GetAllWorkOrdersReadModel {
  static async query() {
    const workOrders = await db.findAll('Work Order');
    return workOrders.filter(order => order.assignedToEmail);
  }
}

export default GetAllWorkOrdersReadModel;