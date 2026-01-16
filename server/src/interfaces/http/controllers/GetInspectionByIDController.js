import express from 'express';
import GetInspectionByIDReadModel from '../../../domain/readmodel/GetInspectionByIDReadModel.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const result = await GetInspectionByIDReadModel.query(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Inspection not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default {
  routeBase: '/get-inspection-by-id',
  router
};