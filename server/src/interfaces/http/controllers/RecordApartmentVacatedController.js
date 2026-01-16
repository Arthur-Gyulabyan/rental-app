import express from 'express';
import RecordApartmentVacatedCommand from '../../../domain/command/RecordApartmentVacatedCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { id, vacatedAt, keysReturned, notes, nextActorEmail } = req.body;

    if (!id) return res.status(400).json({ message: 'id is required.' });

    const result = await RecordApartmentVacatedCommand.execute({
      id,
      vacatedAt,
      keysReturned,
      notes,
      nextActorEmail
    });

    res.status(200).json(result);
  } catch (err) {
    if (err.message === 'Turnover not found') {
      return res.status(404).json({ message: err.message });
    }
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/record-apartment-vacated',
  router,
};