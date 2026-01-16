import express from 'express';
import RescheduleInspectionCommand from '../../../domain/command/RescheduleInspectionCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { id, scheduledAt, assignedToEmail, rescheduledReason } = req.body;

  if (!id) return res.status(400).json({ message: 'id is required.' });
  if (!scheduledAt) return res.status(400).json({ message: 'scheduledAt is required.' });

  try {
    const result = await RescheduleInspectionCommand.execute({
      id,
      scheduledAt,
      assignedToEmail,
      rescheduledReason
    });

    if (!result) {
      return res.status(404).json({ message: 'Inspection not found' });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/reschedule-inspection',
  router,
};