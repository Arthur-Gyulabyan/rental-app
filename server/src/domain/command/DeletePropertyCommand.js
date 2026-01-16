import Property from '../entity/Property.js';
import db from '../../infrastructure/db/index.js';

class DeletePropertyCommand {
  static async execute({ id }) {
    const property = await db.findById('Property', id);
    if (!property) {
      throw new Error('Property not found');
    }
    await db.remove('Property', id);
    return property;
  }
}

export default DeletePropertyCommand;