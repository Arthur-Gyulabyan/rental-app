import { v4 as uuidv4 } from 'uuid';

class Turnover {
  constructor({
    id = uuidv4(),
    leaseId,
    targetReadyDate,
    nextActorEmail,
    vacatedAt,
    keysReturned,
    notes,
    readyToRentDate,
    listingReady,
    marketingEmail,
    finalInspectionPassedAt,
    openWorkOrdersCount,
    checklist,
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    if (!leaseId) throw new Error('leaseId is required');
    if (!targetReadyDate) throw new Error('targetReadyDate is required');

    this.id = id;
    this.leaseId = leaseId;
    this.targetReadyDate = targetReadyDate;
    this.nextActorEmail = nextActorEmail;
    this.vacatedAt = vacatedAt;
    this.keysReturned = keysReturned;
    this.notes = notes;
    this.readyToRentDate = readyToRentDate;
    this.listingReady = listingReady;
    this.marketingEmail = marketingEmail;
    this.finalInspectionPassedAt = finalInspectionPassedAt;
    this.openWorkOrdersCount = openWorkOrdersCount;
    this.checklist = checklist;
    this.createdAt = createdAt instanceof Date ? createdAt : new Date(createdAt);
    this.updatedAt = updatedAt instanceof Date ? updatedAt : new Date(updatedAt);
  }

  update({
    targetReadyDate,
    nextActorEmail,
    vacatedAt,
    keysReturned,
    notes,
    readyToRentDate,
    listingReady,
    marketingEmail,
    finalInspectionPassedAt,
    openWorkOrdersCount,
    checklist
  }) {
    if (targetReadyDate !== undefined) this.targetReadyDate = targetReadyDate;
    if (nextActorEmail !== undefined) this.nextActorEmail = nextActorEmail;
    if (vacatedAt !== undefined) this.vacatedAt = vacatedAt;
    if (keysReturned !== undefined) this.keysReturned = keysReturned;
    if (notes !== undefined) this.notes = notes;
    if (readyToRentDate !== undefined) this.readyToRentDate = readyToRentDate;
    if (listingReady !== undefined) this.listingReady = listingReady;
    if (marketingEmail !== undefined) this.marketingEmail = marketingEmail;
    if (finalInspectionPassedAt !== undefined) this.finalInspectionPassedAt = finalInspectionPassedAt;
    if (openWorkOrdersCount !== undefined) this.openWorkOrdersCount = openWorkOrdersCount;
    if (checklist !== undefined) this.checklist = checklist;
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      leaseId: this.leaseId,
      targetReadyDate: this.targetReadyDate,
      nextActorEmail: this.nextActorEmail,
      vacatedAt: this.vacatedAt,
      keysReturned: this.keysReturned,
      notes: this.notes,
      readyToRentDate: this.readyToRentDate,
      listingReady: this.listingReady,
      marketingEmail: this.marketingEmail,
      finalInspectionPassedAt: this.finalInspectionPassedAt,
      openWorkOrdersCount: this.openWorkOrdersCount,
      checklist: this.checklist
    };
  }
}

export default Turnover;