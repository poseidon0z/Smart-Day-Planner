import { Request, Response, Router } from 'express';
import { sayHello, rateTask, fixTask, reorganise } from '../Utils/geminiUtils';
import { getProblemFromCode } from '../Utils/general';

const router = Router();

// Simple greeting endpoint
router.get('/hello', async (req: Request, res: Response) => {
  try {
    const answer = await sayHello();
    res.send(answer);
  } catch (error) {
    console.error('Error saying hello:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to rate a task based on its description and time frame
router.get('/score', async (req: Request, res: Response): Promise<void> => {
  const task = (req.query.task as string) || '';
  const start = parseInt(req.query.start as string, 10);
  const end = parseInt(req.query.end as string, 10);

  if (isNaN(start) || isNaN(end)) {
    res.status(400).send('Invalid start or end time; they must be numbers.');
  }

  try {
    const answer = await rateTask(task, start, end);
    res.send(answer);
  } catch (error) {
    console.error('Error rating task:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to fix a task based on its description, time, and problem code
router.get('/fix-task', async (req: Request, res: Response): Promise<void> => {
  const task = (req.query.task as string) || '';
  const time = parseInt(req.query.time as string, 10);
  const problemCode = parseInt(req.query.problemCode as string, 10);

  if (!task || !time || !problemCode) {
    res.status(400).send('Task, time, and problemCode are required.');
    return;
  }

  const problem = getProblemFromCode(problemCode);

  try {
    const answer = await fixTask(task, time, problem);
    res.send(answer);
  } catch (error) {
    console.error('Error fixing task:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/reorganise-task', async (req, res) => {
  console.log(req.body);
  const currentTasks = req.body.currentTasks;
  const answer = await reorganise(currentTasks);
  res.send(answer);
});
export default router;
