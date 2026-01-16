import { v4 as uuidv4 } from 'uuid';

class Property {
  constructor({
    id = uuidv4(),
    name,
    address,
    managerName,
    managerEmail,
    unitsCount,
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.managerName = managerName;
    this.managerEmail = managerEmail;
    this.unitsCount = unitsCount;
    this.createdAt = createdAt instanceof Date ? createdAt : new Date(createdAt);
    this.updatedAt = updatedAt instanceof Date ? updatedAt : new Date(updatedAt);
  }

  update({ name, address, managerName, managerEmail, unitsCount }) {
    if (name !== undefined) this.name = name;
    if (address !== undefined) this.address = address;
    if (managerName !== undefined) this.managerName = managerName;
    if (managerEmail !== undefined) this.managerEmail = managerEmail;
    if (unitsCount !== undefined) this.unitsCount = unitsCount;
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      address: this.address,
      managerName: this.managerName,
      managerEmail: this.managerEmail,
      unitsCount: this.unitsCount
    };
  }
}

export default Property;