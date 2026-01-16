import { v4 as uuidv4 } from 'uuid';

class RenovationCase {
  constructor({
    id = uuidv4(),
    turnoverId,
    requestedLevels,
    scopeNotes,
    targetReadyDate,
    nextActorEmail,
    costGood,
    costBetter,
    costPremium,
    leadDaysGood,
    leadDaysBetter,
    leadDaysPremium,
    selectedLevel,
    budgetApproved,
    expectedCompletionDate,
    projectedRent,
    decisionReason,
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    if (!turnoverId) throw new Error('turnoverId is required');

    this.id = id;
    this.turnoverId = turnoverId;
    this.requestedLevels = requestedLevels;
    this.scopeNotes = scopeNotes;
    this.targetReadyDate = targetReadyDate;
    this.nextActorEmail = nextActorEmail;
    this.costGood = costGood;
    this.costBetter = costBetter;
    this.costPremium = costPremium;
    this.leadDaysGood = leadDaysGood;
    this.leadDaysBetter = leadDaysBetter;
    this.leadDaysPremium = leadDaysPremium;
    this.selectedLevel = selectedLevel;
    this.budgetApproved = budgetApproved;
    this.expectedCompletionDate = expectedCompletionDate;
    this.projectedRent = projectedRent;
    this.decisionReason = decisionReason;
    this.createdAt = createdAt instanceof Date ? createdAt : new Date(createdAt);
    this.updatedAt = updatedAt instanceof Date ? updatedAt : new Date(updatedAt);
  }

  update({
    requestedLevels,
    scopeNotes,
    targetReadyDate,
    nextActorEmail,
    costGood,
    costBetter,
    costPremium,
    leadDaysGood,
    leadDaysBetter,
    leadDaysPremium,
    selectedLevel,
    budgetApproved,
    expectedCompletionDate,
    projectedRent,
    decisionReason
  }) {
    if (requestedLevels !== undefined) this.requestedLevels = requestedLevels;
    if (scopeNotes !== undefined) this.scopeNotes = scopeNotes;
    if (targetReadyDate !== undefined) this.targetReadyDate = targetReadyDate;
    if (nextActorEmail !== undefined) this.nextActorEmail = nextActorEmail;
    if (costGood !== undefined) this.costGood = costGood;
    if (costBetter !== undefined) this.costBetter = costBetter;
    if (costPremium !== undefined) this.costPremium = costPremium;
    if (leadDaysGood !== undefined) this.leadDaysGood = leadDaysGood;
    if (leadDaysBetter !== undefined) this.leadDaysBetter = leadDaysBetter;
    if (leadDaysPremium !== undefined) this.leadDaysPremium = leadDaysPremium;
    if (selectedLevel !== undefined) this.selectedLevel = selectedLevel;
    if (budgetApproved !== undefined) this.budgetApproved = budgetApproved;
    if (expectedCompletionDate !== undefined) this.expectedCompletionDate = expectedCompletionDate;
    if (projectedRent !== undefined) this.projectedRent = projectedRent;
    if (decisionReason !== undefined) this.decisionReason = decisionReason;
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      turnoverId: this.turnoverId,
      requestedLevels: this.requestedLevels,
      scopeNotes: this.scopeNotes,
      targetReadyDate: this.targetReadyDate,
      nextActorEmail: this.nextActorEmail,
      costGood: this.costGood,
      costBetter: this.costBetter,
      costPremium: this.costPremium,
      leadDaysGood: this.leadDaysGood,
      leadDaysBetter: this.leadDaysBetter,
      leadDaysPremium: this.leadDaysPremium,
      selectedLevel: this.selectedLevel,
      budgetApproved: this.budgetApproved,
      expectedCompletionDate: this.expectedCompletionDate,
      projectedRent: this.projectedRent,
      decisionReason: this.decisionReason
    };
  }
}

export default RenovationCase;