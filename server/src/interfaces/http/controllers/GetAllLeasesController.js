import express from 'express';
import GetAllLeasesReadModel from '../../../domain/readmodel/GetAllLeasesReadModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const leases = await GetAllLeasesReadModel.query();
    res.json(leases);
  } catch (err) {
    res.status(400).json({ "message": err.message });
  }
});

export default {
  routeBase: '/get-all-leases',
  router,
};