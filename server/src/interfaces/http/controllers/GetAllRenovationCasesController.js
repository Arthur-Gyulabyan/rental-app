import express from 'express';
import GetAllRenovationCasesReadModel from '../../../domain/readmodel/GetAllRenovationCasesReadModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await GetAllRenovationCasesReadModel.query();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/get-all-renovation-cases',
  router,
};