import db from '../../infrastructure/db/index.js';
import RenovationCase from '../entity/RenovationCase.js';

class ProvideRenovationEstimateCommand {
  static async execute({
    id,
    costGood,
    costBetter,
    costPremium,
    leadDaysGood,
    leadDaysBetter,
    leadDaysPremium,
    nextActorEmail
  }) {
    const existing = await db.findById('Renovation Case', id);
    if (!existing) {
      throw new Error('Renovation Case not found');
    }

    const renovationCase = new RenovationCase({
      ...existing,
      costGood,
      costBetter,
      costPremium,
      leadDaysGood,
      leadDaysBetter,
      leadDaysPremium,
      nextActorEmail
    });

    const updated = await db.update('Renovation Case', id, renovationCase.toJSON());
    return updated;
  }
}

export default ProvideRenovationEstimateCommand;