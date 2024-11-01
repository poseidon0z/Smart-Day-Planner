import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config('../../.env');

console.log(process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function sayHello() {
  const result = await model.generateContent(
    "Say 'Hello, I'm gemini, working for smart day planner'"
  );

  return result.response.text();
}

export async function rateTask(task, start, end) {
  const result =
    await model.generateContent(`Evaluate the task specificity and time feasibility based on the following guidelines:
Return 1: If the task requires significant planning or research before execution.
Return 2: The task duration (from start to stop) is insufficient to reasonably complete the task.    
Return 3: The task duration is excessive for a task that requires much less time.
Return 0: If the task is specific, fits the time well, and doesn’t fall into any of the categories above.
    
Task: ${task}
Start: ${start}
Stop: ${end}
Include only the number. If there’s any confusion, return 0.`);
  return result.response.text();
}
