import { GoogleGenerativeAI } from '@google/generative-ai';

console.log(process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function sayHello() {
  const result = await model.generateContent(
    "Say 'Hello, I'm gemini, working for smart day planner'"
  );

  return result.response.text();
}

export async function rateTask(task: string, start: number, end: number) {
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

export async function fixTask(task: string, time: number, problem: string) {
  const result =
    await model.generateContent(`Fix the problem as mentioned. Do not do anything more than solving the explicit problem mentioned. Provide a list of new tasks, each accompanied by a more appropriate duration (in seconds), formatted as a JSON array of objects.

- **Task:** ${task}
- **Original Time:** ${time}
- **Problem:** ${problem}

**Output Format:**
[
    {
        "task": "Focused Task 1",
        "time": new_time_in_seconds
    },
    {
        "task": "Focused Task 2",
        "time": new_time_in_seconds
    }
]
Provide only the JSON array in your response, with no additional text.
`);
  const answer = JSON.parse(result.response.text());
  return answer;
}
