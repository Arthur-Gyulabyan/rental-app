import db from '../../infrastructure/db/index.js';
import RenovationCase from '../entity/RenovationCase.js';

class SelectRenovationPlanCommand {
  static async execute({ id, selectedLevel, budgetApproved, expectedCompletionDate, projectedRent, decisionReason, nextActorEmail }) {
    const existing = await db.findById('Renovation Case', id);
    if (!existing) {
      throw new Error('Not Found');
    }

    const renovationCase = new RenovationCase({
      ...existing,
      selectedLevel,
      budgetApproved,
      expectedCompletionDate,
      projectedRent,
      decisionReason,
      nextActorEmail
    });

    const updated = await db.update('Renovation Case', id, renovationCase.toJSON());
    return updated;
  }
}

export default SelectRenovationPlanCommand;