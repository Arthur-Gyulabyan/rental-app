import CancelInspectionCommand from '../../../domain/command/CancelInspectionCommand.js';
import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    if (!req.body.id) return res.status(400).json({ message: 'id is required.' });
    const result = await CancelInspectionCommand.execute(req.body);
    res.status(200).json(result);
  } catch (err) {
    if (err.message === 'Inspection not found') {
      return res.status(404).json({ message: err.message });
    }
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/cancel-inspection',
  router,
};