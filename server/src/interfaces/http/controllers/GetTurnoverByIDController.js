import express from 'express';
import GetTurnoverByIDReadModel from '../../../domain/readmodel/GetTurnoverByIDReadModel.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const result = await GetTurnoverByIDReadModel.query(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Turnover not found' });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/get-turnover-by-id',
  router,
};