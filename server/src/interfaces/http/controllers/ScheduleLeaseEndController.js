import express from 'express';
import ScheduleLeaseEndCommand from '../../../domain/command/ScheduleLeaseEndCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  if (!req.body.id) return res.status(400).json({ message: 'id is required.' });
  if (!req.body.apartmentId) return res.status(400).json({ message: 'apartmentId is required.' });
  if (!req.body.currentRent) return res.status(400).json({ message: 'currentRent is required.' });

  try {
    const result = await ScheduleLeaseEndCommand.execute(req.body);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === 'Lease not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(400).json({ message: error.message });
  }
});

export default {
  routeBase: '/schedule-lease-end',
  router,
};