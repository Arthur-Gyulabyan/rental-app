import CreateRenovationReportCommand from '../../../domain/command/CreateRenovationReportCommand.js';
import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
  const { inspectionId, damageSeverity, estimatedRepairCost, damageSummary, nextActorEmail } = req.body;

  if (!inspectionId) return res.status(400).json({ message: 'inspectionId is required.' });
  if (!damageSeverity) return res.status(400).json({ message: 'damageSeverity is required.' });
  if (!estimatedRepairCost) return res.status(400).json({ message: 'estimatedRepairCost is required.' });
  if (!damageSummary) return res.status(400).json({ message: 'damageSummary is required.' });

  try {
    const result = await CreateRenovationReportCommand.execute({
      inspectionId,
      damageSeverity,
      estimatedRepairCost,
      damageSummary,
      nextActorEmail
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/create-renovation-report',
  router
};