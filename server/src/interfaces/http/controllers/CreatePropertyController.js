import express from 'express';
import CreatePropertyCommand from '../../../domain/command/CreatePropertyCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, address, managerName, managerEmail, unitsCount } = req.body;

  if (!name) return res.status(400).json({ message: 'name is required.' });
  if (!address) return res.status(400).json({ message: 'address is required.' });
  if (!managerName) return res.status(400).json({ message: 'managerName is required.' });
  if (!managerEmail) return res.status(400).json({ message: 'managerEmail is required.' });
  if (!unitsCount) return res.status(400).json({ message: 'unitsCount is required.' });

  try {
    const result = await CreatePropertyCommand.execute({
      name,
      address,
      managerName,
      managerEmail,
      unitsCount,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default {
  routeBase: '/create-property',
  router,
};