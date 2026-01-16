import express from 'express';
import UpdatePropertyCommand from '../../../domain/command/UpdatePropertyCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  if (!req.body.id) return res.status(400).json({ message: 'id is required.' });
  if (!req.body.name) return res.status(400).json({ message: 'name is required.' });
  if (!req.body.address) return res.status(400).json({ message: 'address is required.' });
  if (!req.body.managerName) return res.status(400).json({ message: 'managerName is required.' });
  if (!req.body.managerEmail) return res.status(400).json({ message: 'managerEmail is required.' });
  if (!req.body.unitsCount) return res.status(400).json({ message: 'unitsCount is required.' });

  try {
    const result = await UpdatePropertyCommand.execute({
      id: req.body.id,
      name: req.body.name,
      address: req.body.address,
      managerName: req.body.managerName,
      managerEmail: req.body.managerEmail,
      unitsCount: req.body.unitsCount
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
  routeBase: '/update-property',
  router,
};