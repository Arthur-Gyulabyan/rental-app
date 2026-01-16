import CreateWorkOrderCommand from '../../../domain/command/CreateWorkOrderCommand.js';
import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
  const { renovationCaseId, scopeSummary, materialsList, accessDetails, nextActorEmail } = req.body;

  if (!renovationCaseId) return res.status(400).json({ message: 'renovationCaseId is required.' });
  if (!scopeSummary) return res.status(400).json({ message: 'scopeSummary is required.' });
  if (!materialsList) return res.status(400).json({ message: 'materialsList is required.' });

  try {
    const result = await CreateWorkOrderCommand.execute({
      renovationCaseId,
      scopeSummary,
      materialsList,
      accessDetails,
      nextActorEmail
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/create-work-order',
  router,
};