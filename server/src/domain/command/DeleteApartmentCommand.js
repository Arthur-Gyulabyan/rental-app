import db from '../../infrastructure/db/index.js';

class DeleteApartmentCommand {
  static async execute({ id }) {
    const apartment = await db.findById('Apartment', id);

    if (!apartment) {
      throw new Error('Apartment not found');
    }

    if (apartment.status === 'Occupied') {
      throw new Error('Apartment has active leases');
    }

    await db.remove('Apartment', id);

    return apartment;
  }
}

export default DeleteApartmentCommand;