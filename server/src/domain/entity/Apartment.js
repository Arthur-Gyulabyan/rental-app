import { v4 as uuidv4 } from 'uuid';

class Apartment {
  constructor({
    id = uuidv4(),
    propertyId,
    unitNumber,
    floorAreaSqm,
    bedrooms,
    status,
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    if (!propertyId) throw new Error('Property ID is required');
    if (!unitNumber) throw new Error('Unit number is required');
    if (!floorAreaSqm) throw new Error('Floor area is required');
    if (!bedrooms) throw new Error('Bedrooms count is required');
    if (!status) throw new Error('Status is required');

    this.id = id;
    this.propertyId = propertyId;
    this.unitNumber = unitNumber;
    this.floorAreaSqm = floorAreaSqm;
    this.bedrooms = bedrooms;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  update({ propertyId, unitNumber, floorAreaSqm, bedrooms, status }) {
    if (propertyId !== undefined) this.propertyId = propertyId;
    if (unitNumber !== undefined) this.unitNumber = unitNumber;
    if (floorAreaSqm !== undefined) this.floorAreaSqm = floorAreaSqm;
    if (bedrooms !== undefined) this.bedrooms = bedrooms;
    if (status !== undefined) this.status = status;
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      propertyId: this.propertyId,
      unitNumber: this.unitNumber,
      floorAreaSqm: this.floorAreaSqm,
      bedrooms: this.bedrooms,
      status: this.status
    };
  }
}

export default Apartment;