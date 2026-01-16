import db from '../../infrastructure/db/index.js';
import RenovationCase from '../entity/RenovationCase.js';
import { v4 as uuid } from 'uuid';

class RequestRenovationEstimateCommand {
  static async execute({ turnoverId, requestedLevels, scopeNotes, targetReadyDate, nextActorEmail }) {
    const renovationCase = new RenovationCase({
      id: uuid(),
      turnoverId,
      requestedLevels,
      scopeNotes,
      targetReadyDate,
      nextActorEmail
    });
    await db.insert('Renovation Case', renovationCase.toJSON());
    return renovationCase.toJSON();
  }
}

export default RequestRenovationEstimateCommand;