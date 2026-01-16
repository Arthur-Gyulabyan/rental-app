import express from 'express';
import ProvideRenovationEstimateCommand from '../../../domain/command/ProvideRenovationEstimateCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  if (!req.body.id) return res.status(400).json({ message: 'id is required.' });

  try {
    const result = await ProvideRenovationEstimateCommand.execute({
      id: req.body.id,
      costGood: req.body.costGood,
      costBetter: req.body.costBetter,
      costPremium: req.body.costPremium,
      leadDaysGood: req.body.leadDaysGood,
      leadDaysBetter: req.body.leadDaysBetter,
      leadDaysPremium: req.body.leadDaysPremium,
      nextActorEmail: req.body.nextActorEmail
    });
    res.status(200).json(result);
  } catch (err) {
    if (err.message === 'Renovation Case not found') {
      return res.status(404).json({ message: err.message });
    }
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/provide-renovation-estimate',
  router,
};