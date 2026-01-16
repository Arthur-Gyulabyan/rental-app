import CompleteInspectionCommand from '../../../domain/command/CompleteInspectionCommand.js';
import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
  if (!req.body.id) return res.status(400).json({ message: 'id is required.' });
  if (!req.body.turnoverId) return res.status(400).json({ message: 'turnoverId is required.' });

  try {
    const result = await CompleteInspectionCommand.execute(req.body);
    res.status(200).json(result);
  } catch (err) {
    if (err.message === 'Inspection not found') {
      return res.status(404).json({ message: err.message });
    }
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/complete-inspection',
  router,
};