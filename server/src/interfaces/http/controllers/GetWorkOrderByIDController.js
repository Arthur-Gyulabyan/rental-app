import express from 'express';
import GetWorkOrderByIDReadModel from '../../../domain/readmodel/GetWorkOrderByIDReadModel.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await GetWorkOrderByIDReadModel.query(id);
    if (!result) {
      return res.status(404).json({ message: 'Work Order not found' });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/get-work-order-by-id',
  router,
};