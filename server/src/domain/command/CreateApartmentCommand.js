import { v4 as uuid } from 'uuid';
import Apartment from '../entity/Apartment.js';
import db from '../../infrastructure/db/index.js';

class CreateApartmentCommand {
  static async execute({ propertyId, unitNumber, floorAreaSqm, bedrooms, status }) {
    const property = await db.findById('Property', propertyId);
    if (!property) throw new Error('Property not found');

    const apartments = await db.findAll('Apartment');
    const duplicate = apartments.find(a => a.propertyId === propertyId && a.unitNumber === unitNumber);
    if (duplicate) throw new Error('Apartment with this unit number already exists under this property');

    if (Number(floorAreaSqm) <= 0 || Number(bedrooms) <= 0) {
      throw new Error('Floor area and bedrooms must be positive values');
    }

    const validStatuses = ['Occupied', 'Vacant', 'Ready'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid initial status');
    }

    const apartment = new Apartment({
      id: uuid(),
      propertyId,
      unitNumber,
      floorAreaSqm,
      bedrooms,
      status
    });

    await db.insert('Apartment', apartment);
    return apartment;
  }
}

export default CreateApartmentCommand;