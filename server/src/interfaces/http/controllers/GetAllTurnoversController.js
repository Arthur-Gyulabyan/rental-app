import express from 'express';
import GetAllTurnoversReadModel from '../../../domain/readmodel/GetAllTurnoversReadModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await GetAllTurnoversReadModel.query();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ "message": error.message });
  }
});

export default {
  routeBase: '/get-all-turnovers',
  router
};