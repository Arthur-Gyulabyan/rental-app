import express from 'express';
import GetRenovationCaseByIDReadModel from '../../../domain/readmodel/GetRenovationCaseByIDReadModel.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await GetRenovationCaseByIDReadModel.query(id);
    if (!result) {
      return res.status(404).json({ message: 'Renovation Case not found' });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/get-renovation-case-by-id',
  router,
};