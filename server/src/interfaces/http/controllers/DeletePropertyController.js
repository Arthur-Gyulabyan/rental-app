import DeletePropertyCommand from '../../../domain/command/DeletePropertyCommand.js';
import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: 'id is required.' });

  try {
    const result = await DeletePropertyCommand.execute({ id });
    res.status(200).json(result);
  } catch (err) {
    if (err.message === 'Property not found') {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/delete-property',
  router,
};