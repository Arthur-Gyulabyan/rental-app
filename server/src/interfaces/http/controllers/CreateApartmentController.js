import CreateApartmentCommand from '../../../domain/command/CreateApartmentCommand.js';
import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
  const { propertyId, unitNumber, floorAreaSqm, bedrooms, status } = req.body;

  if (!propertyId) return res.status(400).json({ message: 'propertyId is required.' });
  if (!unitNumber) return res.status(400).json({ message: 'unitNumber is required.' });
  if (!floorAreaSqm) return res.status(400).json({ message: 'floorAreaSqm is required.' });
  if (!bedrooms) return res.status(400).json({ message: 'bedrooms is required.' });
  if (!status) return res.status(400).json({ message: 'status is required.' });

  try {
    const result = await CreateApartmentCommand.execute({
      propertyId,
      unitNumber,
      floorAreaSqm,
      bedrooms,
      status
    });
    res.status(200).json(result);
  } catch (err) {
    if (err.message === 'Property not found') {
      return res.status(404).json({ message: err.message });
    }
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/create-apartment',
  router
};