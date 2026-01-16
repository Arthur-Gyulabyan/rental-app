import db from '../../infrastructure/db/index.js';
import Property from '../entity/Property.js';

class UpdatePropertyCommand {
  static async execute({ id, name, address, managerName, managerEmail, unitsCount }) {
    const existing = await db.findById('Property', id);
    if (!existing) {
      throw new Error('Property not found');
    }

    const property = new Property({
      id,
      name,
      address,
      managerName,
      managerEmail,
      unitsCount
    });

    const updated = await db.update('Property', id, property.toJSON());
    return updated;
  }
}

export default UpdatePropertyCommand;