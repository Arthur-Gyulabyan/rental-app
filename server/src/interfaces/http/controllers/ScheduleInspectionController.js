import express from 'express';
import ScheduleInspectionCommand from '../../../domain/command/ScheduleInspectionCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  if (!req.body.turnoverId) return res.status(400).json({ message: 'turnoverId is required.' });
  if (!req.body.scheduledAt) return res.status(400).json({ message: 'scheduledAt is required.' });

  try {
    const result = await ScheduleInspectionCommand.execute({
      assignedToEmail: req.body.assignedToEmail,
      locationNotes: req.body.locationNotes,
      nextActorEmail: req.body.nextActorEmail,
      scheduledAt: req.body.scheduledAt,
      turnoverId: req.body.turnoverId
    });
    res.status(200).json(result);
  } catch (err) {
    if (err.message.includes('not found')) {
      return res.status(404).json({ message: err.message });
    }
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/schedule-inspection',
  router
};