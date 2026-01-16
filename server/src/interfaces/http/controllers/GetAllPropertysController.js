import express from 'express';
import GetAllPropertysReadModel from '../../../domain/readmodel/GetAllPropertysReadModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await GetAllPropertysReadModel.query();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ "message": err.message });
  }
});

export default {
  routeBase: '/get-all-propertys',
  router,
};