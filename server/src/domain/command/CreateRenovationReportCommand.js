import db from '../../infrastructure/db/index.js';
import RenovationReport from '../entity/RenovationReport.js';
import { v4 as uuid } from 'uuid';

class CreateRenovationReportCommand {
  static async execute({ inspectionId, damageSeverity, estimatedRepairCost, damageSummary, nextActorEmail }) {
    const id = uuid();
    const renovationReport = new RenovationReport({
      id,
      inspectionId,
      damageSeverity,
      estimatedRepairCost,
      damageSummary,
      nextActorEmail
    });
    await db.insert('Renovation Report', renovationReport.toJSON());
    return renovationReport.toJSON();
  }
}

export default CreateRenovationReportCommand;