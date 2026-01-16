import CompleteTurnoverCommand from '../../../domain/command/CompleteTurnoverCommand.js';
import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ message: 'id is required.' });
  }

  try {
    const result = await CompleteTurnoverCommand.execute({
      id: req.body.id,
      readyToRentDate: req.body.readyToRentDate,
      listingReady: req.body.listingReady,
      marketingEmail: req.body.marketingEmail,
      notes: req.body.notes
    });
    res.status(200).json(result);
  } catch (error) {
    const statusCode = error.status || 400;
    res.status(statusCode).json({ message: error.message });
  }
});

export default {
  routeBase: '/complete-turnover',
  router
};