import CreateLeaseCommand from '../../../domain/command/CreateLeaseCommand.js';
import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
  const { apartmentId, currentRent, nextActorEmail, tenantName } = req.body;

  if (!apartmentId) return res.status(400).json({ message: 'apartmentId is required.' });
  if (!currentRent) return res.status(400).json({ message: 'currentRent is required.' });
  if (!tenantName) return res.status(400).json({ message: 'tenantName is required.' });

  try {
    const result = await CreateLeaseCommand.execute({
      apartmentId,
      currentRent,
      nextActorEmail,
      tenantName
    });
    res.status(200).json(result);
  } catch (err) {
    if (err.message === 'Apartment not found') {
      return res.status(404).json({ message: err.message });
    }
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/create-lease',
  router
};