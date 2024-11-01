import { Router } from 'express';
import { sayHello, rateTask } from '../Utils/geminiUtils.mjs';

const router = Router();

router.get('/hello', async (req, res) => {
  const answer = await sayHello();
  res.send(answer);
});

router.get('/score', async (req, res) => {
  const { task, start, end } = req.query;
  const answer = await rateTask(task, start, end);
  res.send(answer);
});

export default router;
