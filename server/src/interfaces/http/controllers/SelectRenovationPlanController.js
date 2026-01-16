import express from 'express';
import SelectRenovationPlanCommand from '../../../domain/command/SelectRenovationPlanCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  if (!req.body.id) return res.status(400).json({ message: 'id is required.' });

  try {
    const result = await SelectRenovationPlanCommand.execute({
      id: req.body.id,
      selectedLevel: req.body.selectedLevel,
      budgetApproved: req.body.budgetApproved,
      expectedCompletionDate: req.body.expectedCompletionDate,
      projectedRent: req.body.projectedRent,
      decisionReason: req.body.decisionReason,
      nextActorEmail: req.body.nextActorEmail
    });
    res.status(200).json(result);
  } catch (err) {
    if (err.message === 'Not Found') {
      return res.status(404).json({ message: err.message });
    }
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/select-renovation-plan',
  router,
};