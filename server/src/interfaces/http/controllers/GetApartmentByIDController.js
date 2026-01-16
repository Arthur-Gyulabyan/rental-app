import express from 'express';
import GetApartmentByIDReadModel from '../../../domain/readmodel/GetApartmentByIDReadModel.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await GetApartmentByIDReadModel.query(id);

    if (!result) {
      return res.status(404).json({ message: 'Apartment not found' });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/get-apartment-by-id',
  router,
};