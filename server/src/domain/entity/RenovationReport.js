import { v4 as uuidv4 } from 'uuid';

class RenovationReport {
  constructor({
    id = uuidv4(),
    inspectionId,
    damageSeverity,
    estimatedRepairCost,
    damageSummary,
    nextActorEmail,
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    this.id = id;
    this.inspectionId = inspectionId;
    this.damageSeverity = damageSeverity;
    this.estimatedRepairCost = estimatedRepairCost;
    this.damageSummary = damageSummary;
    this.nextActorEmail = nextActorEmail;
    this.createdAt = createdAt instanceof Date ? createdAt : new Date(createdAt);
    this.updatedAt = updatedAt instanceof Date ? updatedAt : new Date(updatedAt);
  }

  update({
    inspectionId,
    damageSeverity,
    estimatedRepairCost,
    damageSummary,
    nextActorEmail
  }) {
    if (inspectionId !== undefined) this.inspectionId = inspectionId;
    if (damageSeverity !== undefined) this.damageSeverity = damageSeverity;
    if (estimatedRepairCost !== undefined) this.estimatedRepairCost = estimatedRepairCost;
    if (damageSummary !== undefined) this.damageSummary = damageSummary;
    if (nextActorEmail !== undefined) this.nextActorEmail = nextActorEmail;
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      inspectionId: this.inspectionId,
      damageSeverity: this.damageSeverity,
      estimatedRepairCost: this.estimatedRepairCost,
      damageSummary: this.damageSummary,
      nextActorEmail: this.nextActorEmail,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    };
  }
}

export default RenovationReport;