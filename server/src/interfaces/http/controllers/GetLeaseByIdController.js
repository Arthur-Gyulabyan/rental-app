import express from 'express';
import GetLeaseByIdReadModel from '../../../domain/readmodel/GetLeaseByIdReadModel.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const data = await GetLeaseByIdReadModel.query(req.params.id);
    if (!data) {
      return res.status(404).json({ "message": 'Lease not found' });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ "message": err.message });
  }
});

export default {
  routeBase: '/get-lease-by-id',
  router
};