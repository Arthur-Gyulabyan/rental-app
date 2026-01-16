import CompleteWorkOrderCommand from '../../../domain/command/CompleteWorkOrderCommand.js';
import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
  if (!req.body.id) return res.status(400).json({ message: 'id is required.' });

  try {
    const result = await CompleteWorkOrderCommand.execute(req.body);
    if (!result) return res.status(404).json({ message: 'Work Order not found' });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/complete-work-order',
  router,
};