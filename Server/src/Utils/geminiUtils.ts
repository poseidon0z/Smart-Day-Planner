import { GoogleGenerativeAI } from '@google/generative-ai';

console.log(process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

interface task {
  task: string;
  start: number;
  end: number;
  completed: boolean;
  completedTime: number;
}

export async function sayHello() {
  const result = await model.generateContent(
    "Say 'Hello, I'm gemini, working for smart day planner'"
  );

  return result.response.text();
}

export async function rateTask(task: string, start: number, end: number) {
  const result =
    await model.generateContent(`Evaluate the task specificity and time feasibility based on the following guidelines. Routine activities (e.g., "attend class," "revise for exam") that are generally understood should not be flagged as vague. Duration is in seconds:
    Return 1: If the task lacks clear objectives or specific outcomes that would make it difficult to complete without further detail.
    Return 2: The task duration is insufficient for a well-defined and specific task that reasonably needs more time.
    Return 3: The task duration is excessive for a task that is specific and requires significantly less time.
    Return 0: If the task is either broad/abstract by nature or is specific, fits the time well, and doesn’t fall into any of the categories above.
    
    Task: ${task}
    Duration: ${end - start}
    Include only the number. If there’s any confusion, return 0.`);
  return result.response.text();
}

export async function fixTask(task: string, time: number, problem: string) {
  const result =
    await model.generateContent(`Fix the problem as mentioned. Do not do anything more than solving the explicit problem mentioned. Provide a list of new tasks, each accompanied by a more appropriate duration (in seconds), formatted as a JSON array of objects. Time is given in seconds.

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

export async function reorganise(currentTasks: task[]) {
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

  const timeSaved = currentTasks
    .filter((task) => task.completed)
    .reduce((total, task) => total + (task.end - task.completedTime!), 0);

  const result =
    await model.generateContent(`You are an intelligent scheduling assistant focused on employee wellbeing. Reorganize these tasks with these principles:

Input Tasks: ${JSON.stringify(currentTasks, null, 2)}

Key Information:

    Current time: ${currentTime}
    Total time saved from early completions: ${timeSaved} seconds

Core Requirements:

    DO NOT MAKE ANY CHANGES TO COMPLETED TASKS.
    For incomplete tasks:
        Use completedTime as the end time for completed tasks to determine the start of the next task or break. If completedTime is null, use the task's original end.
        Maintain their original durations (end - start time difference).
        Start each task immediately after the previous task ends, considering completedTime or current time.
        No task should start before current time.
    Insert breaks and end early:
        Add 15-minute breaks between tasks when possible (900 seconds).
        If more than 45 minutes was saved (2700 seconds), end the workday earlier.
        Label breaks as {"task": "Break", "completed": false, "completedTime": 0}.
    Priorities:
        First priority: Maintain task durations.
        Second priority: Add breaks between tasks.
        Third priority: End the day earlier.

IMPORTANT: Return the raw JSON without any codeblock formatting, explanation, or additional text. Do not wrap the response in backticks or any other formatting. The response should start with { and end with } and be valid JSON.
Response Format:
{
  "currentTasks": [
    {
      "task": string,
      "start": number,
      "end": number,
      "completed": boolean,
      "completedTime": number | null
    }
  ]
}
`);
  return JSON.parse(result.response.text());
}
