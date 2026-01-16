import CreateTurnoverCommand from '../../../domain/command/CreateTurnoverCommand.js';
import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    if (!req.body.leaseId) return res.status(400).json({ message: 'leaseId is required.' });
    if (!req.body.targetReadyDate) return res.status(400).json({ message: 'targetReadyDate is required.' });

    const result = await CreateTurnoverCommand.execute({
      leaseId: req.body.leaseId,
      targetReadyDate: req.body.targetReadyDate,
      nextActorEmail: req.body.nextActorEmail
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/create-turnover',
  router
};