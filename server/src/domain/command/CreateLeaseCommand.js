import db from '../../infrastructure/db/index.js';
import Lease from '../entity/Lease.js';
import { v4 as uuid } from 'uuid';

class CreateLeaseCommand {
  static async execute({ apartmentId, currentRent, nextActorEmail, tenantName }) {
    const apartment = await db.findById('Apartment', apartmentId);

    if (!apartment) {
      throw new Error('Apartment not found');
    }

    if (apartment.status !== 'Vacant' && apartment.status !== 'Ready') {
      throw new Error('Apartment is not available for leasing');
    }

    const lease = new Lease({
      id: uuid(),
      apartmentId,
      currentRent,
      nextActorEmail,
      tenantName
    });

    await db.update('Apartment', apartmentId, { status: 'Occupied' });
    await db.insert('Lease', lease.toJSON());

    return lease.toJSON();
  }
}

export default CreateLeaseCommand;