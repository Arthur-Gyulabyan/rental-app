import express from 'express';
import RequestRenovationEstimateCommand from '../../../domain/command/RequestRenovationEstimateCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  if (!req.body.turnoverId) return res.status(400).json({ message: 'turnoverId is required.' });

  try {
    const result = await RequestRenovationEstimateCommand.execute({
      turnoverId: req.body.turnoverId,
      requestedLevels: req.body.requestedLevels,
      scopeNotes: req.body.scopeNotes,
      targetReadyDate: req.body.targetReadyDate,
      nextActorEmail: req.body.nextActorEmail
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/request-renovation-estimate',
  router,
};