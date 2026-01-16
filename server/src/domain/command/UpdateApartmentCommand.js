import Apartment from '../entity/Apartment.js';
import db from '../../infrastructure/db/index.js';

class UpdateApartmentCommand {
  static async execute({ id, unitNumber, floorAreaSqm, bedrooms, status }) {
    const existing = await db.findById('Apartment', id);
    if (!existing) {
      const error = new Error('Apartment not found');
      error.status = 404;
      throw error;
    }

    const updatedApartment = new Apartment({
      ...existing,
      unitNumber,
      floorAreaSqm,
      bedrooms,
      status
    });

    const result = await db.update('Apartment', id, updatedApartment.toJSON());
    return result;
  }
}

export default UpdateApartmentCommand;