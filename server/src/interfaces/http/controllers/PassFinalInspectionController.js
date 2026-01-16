import express from 'express';
import PassFinalInspectionCommand from '../../../domain/command/PassFinalInspectionCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { id, passedAt, inspectorName, certificateUrl, nextActorEmail } = req.body;

    if (!id) return res.status(400).json({ message: 'Id is required.' });

    const result = await PassFinalInspectionCommand.execute({
      id,
      passedAt,
      inspectorName,
      certificateUrl,
      nextActorEmail
    });

    if (!result) {
      return res.status(404).json({ message: 'Inspection not found.' });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/pass-final-inspection',
  router,
};