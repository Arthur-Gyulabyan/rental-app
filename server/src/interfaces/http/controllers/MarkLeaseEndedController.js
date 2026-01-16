import express from 'express';
import MarkLeaseEndedCommand from '../../../domain/command/MarkLeaseEndedCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    if (!req.body.id) return res.status(400).json({ message: 'id is required.' });
    if (!req.body.apartmentId) return res.status(400).json({ message: 'apartmentId is required.' });

    const result = await MarkLeaseEndedCommand.execute(req.body);

    if (!result) {
      return res.status(404).json({ message: 'Lease not found.' });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/mark-lease-ended',
  router,
};