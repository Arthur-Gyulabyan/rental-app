import express from 'express';
import UpdateApartmentCommand from '../../../domain/command/UpdateApartmentCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { id, unitNumber, floorAreaSqm, bedrooms, status } = req.body;

    if (!id) return res.status(400).json({ message: 'Field is required.' });
    if (!unitNumber) return res.status(400).json({ message: 'Field is required.' });
    if (!floorAreaSqm) return res.status(400).json({ message: 'Field is required.' });
    if (!bedrooms) return res.status(400).json({ message: 'Field is required.' });
    if (!status) return res.status(400).json({ message: 'Field is required.' });

    const result = await UpdateApartmentCommand.execute({
      id,
      unitNumber,
      floorAreaSqm,
      bedrooms,
      status
    });

    res.status(200).json(result);
  } catch (err) {
    const status = err.status || 400;
    res.status(status).json({ message: err.message });
  }
});

export default {
  routeBase: '/update-apartment',
  router,
};