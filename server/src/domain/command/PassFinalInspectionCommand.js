import Inspection from '../entity/Inspection.js';
import db from '../../infrastructure/db/index.js';

class PassFinalInspectionCommand {
  static async execute({ id, passedAt, inspectorName, certificateUrl, nextActorEmail }) {
    const existing = await db.findById('Inspection', id);
    if (!existing) return null;

    const updatedInspection = new Inspection({
      ...existing,
      passedAt,
      inspectorName,
      certificateUrl,
      nextActorEmail
    });

    const result = await db.update('Inspection', id, updatedInspection.toJSON());
    return result;
  }
}

export default PassFinalInspectionCommand;