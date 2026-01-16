import express from 'express';
import ScheduleWorkOrderCommand from '../../../domain/command/ScheduleWorkOrderCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { id, startDate, endDate, crewName, assignedToEmail, materialsReady, nextActorEmail } = req.body;

  if (!id) return res.status(400).json({ message: 'id is required.' });

  try {
    const result = await ScheduleWorkOrderCommand.execute({
      id,
      startDate,
      endDate,
      crewName,
      assignedToEmail,
      materialsReady,
      nextActorEmail
    });

    res.status(200).json(result);
  } catch (err) {
    if (err.message === 'Work Order not found') {
      return res.status(404).json({ message: err.message });
    }
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/schedule-work-order',
  router,
};