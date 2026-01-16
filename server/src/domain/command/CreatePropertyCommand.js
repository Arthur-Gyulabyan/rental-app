import { v4 as uuid } from 'uuid';
import Property from '../entity/Property.js';
import db from '../../infrastructure/db/index.js';

class CreatePropertyCommand {
  static async execute({ name, address, managerName, managerEmail, unitsCount }) {
    const properties = await db.findAll('Property');
    if (properties.some((p) => p.address === address)) {
      throw new Error('Property already exists at the specified address');
    }

    if (Number(unitsCount) <= 0) {
      throw new Error('unitsCount must be positive');
    }

    const property = new Property({
      id: uuid(),
      name,
      address,
      managerName,
      managerEmail,
      unitsCount,
    });

    await db.insert('Property', property);

    return property;
  }
}

export default CreatePropertyCommand;