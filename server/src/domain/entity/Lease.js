import { v4 as uuidv4 } from 'uuid';

class Lease {
  constructor({
    id = uuidv4(),
    apartmentId,
    endDate,
    noticeDate,
    currentRent,
    nextActorEmail,
    moveOutConfirmedAt,
    turnoverId,
    tenantName,
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    if (!id) throw new Error('id is required');
    if (!apartmentId) throw new Error('apartmentId is required');
    if (!currentRent) throw new Error('currentRent is required');
    if (!tenantName) throw new Error('tenantName is required');

    this.id = id;
    this.apartmentId = apartmentId;
    this.endDate = endDate;
    this.noticeDate = noticeDate;
    this.currentRent = currentRent;
    this.nextActorEmail = nextActorEmail;
    this.moveOutConfirmedAt = moveOutConfirmedAt;
    this.turnoverId = turnoverId;
    this.tenantName = tenantName;
    this.createdAt = createdAt instanceof Date ? createdAt : new Date(createdAt);
    this.updatedAt = updatedAt instanceof Date ? updatedAt : new Date(updatedAt);
  }

  update({
    endDate,
    noticeDate,
    currentRent,
    nextActorEmail,
    moveOutConfirmedAt,
    turnoverId,
    tenantName
  }) {
    if (endDate !== undefined) this.endDate = endDate;
    if (noticeDate !== undefined) this.noticeDate = noticeDate;
    if (currentRent !== undefined) this.currentRent = currentRent;
    if (nextActorEmail !== undefined) this.nextActorEmail = nextActorEmail;
    if (moveOutConfirmedAt !== undefined) this.moveOutConfirmedAt = moveOutConfirmedAt;
    if (turnoverId !== undefined) this.turnoverId = turnoverId;
    if (tenantName !== undefined) this.tenantName = tenantName;
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      apartmentId: this.apartmentId,
      endDate: this.endDate,
      noticeDate: this.noticeDate,
      currentRent: this.currentRent,
      nextActorEmail: this.nextActorEmail,
      moveOutConfirmedAt: this.moveOutConfirmedAt,
      turnoverId: this.turnoverId,
      tenantName: this.tenantName
    };
  }
}

export default Lease;