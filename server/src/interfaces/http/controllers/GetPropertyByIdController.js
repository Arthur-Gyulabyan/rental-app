import express from 'express';
import GetPropertyByIdReadModel from '../../../domain/readmodel/GetPropertyByIdReadModel.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const property = await GetPropertyByIdReadModel.query(id);
    if (!property) {
      return res.status(404).json({ "message": 'Property not found' });
    }
    res.json(property);
  } catch (err) {
    res.status(400).json({ "message": err.message });
  }
});

export default {
  routeBase: '/get-property-by-id',
  router,
};