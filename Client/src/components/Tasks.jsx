import React, { useState } from 'react';
import Task from '../Objects/Task';
import trashBin from '/trashbin.svg';

function getProblemFromCode(problemCode) {
  if (problemCode === 1) {
    return 'The task is not specific.';
  } else if (problemCode === 2) {
    return 'The allocated time is insufficient to complete the task.';
  } else if (problemCode === 3) {
    return 'The allocated time is excessive for this task.';
  } else if (problemCode === 0) {
    return 'The task is specific and well-suited to the allocated time.';
  } else {
    return 'Unknown problem code.';
  }
}

const getTodayTasks = (date, tasks) => {
  return tasks.filter(
    (task) => new Date(task.date).toDateString() === date.toDateString()
  );
};

const getFutureTasks = (date, tasks) => {
  return tasks.filter(
    (task) => new Date(task.date).getTime() > date.getTime() + 43200000
  );
};

function Tasks({ date, tasks, setTasks }) {
  const baseURL = 'http://localhost:3000';
  const [newTask, setNewTask] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [startTimeVar, setStartTimeVar] = useState('');
  const [endTimeVar, setEndTimeVar] = useState('');

  if (!date) {
    date = new Date(); // Set date to current date if no date is selected
  }

  // const addNewTask = () => {
  //   if (!newTask) {
  //     alert("Please enter a task description.");
  //     return;
  //   }
  //   if (!startTime || !endTime) {
  //     alert("Please enter both start and end times.");
  //     return;
  //   }
  //   if (startTime >= endTime) {
  //     alert("End time must be after start time.");
  //     return;
  //   }

  //   const formattedDate = date.toDateString();
  //   const task = new Task(formattedDate, newTask, startTime, endTime);
  //   setTasks([...tasks, task]);

  //   setNewTask("");
  //   setStartTime("");
  //   setEndTime("");
  // };

  const addNewTask = async () => {
    if (!newTask) {
      alert('Please enter a task description.');
      return;
    }
    if (!startTime || !endTime) {
      alert('Please enter both start and end times.');
      return;
    }
    if (startTime >= endTime) {
      alert('End time must be after start time.');
      return;
    }

    try {
      // Call the API to get the task score
      const response = await fetch(
        `${baseURL}/AI/score?task=${encodeURIComponent(
          newTask
        )}&start=${startTime}&end=${endTime}`
      );
      if (!response.ok) {
        alert('There was an error rating the task.');
        return;
      }

      const problemCode = await response.json();
      const problemMessage = getProblemFromCode(problemCode);

      if (problemCode !== 0) {
        // Alert user about the issue and prompt to auto-generate a better task
        const userWantsAutoFix = window.confirm(
          `${problemMessage}\nWould you like to auto-generate a better task?`
        );

        if (userWantsAutoFix) {
          // Call the fix-task API to generate better task suggestions
          const timeDuration = parseInt(endTime, 10) - parseInt(startTime, 10);
          const fixResponse = await fetch(
            `${baseURL}/AI/fix-task?task=${encodeURIComponent(
              newTask
            )}&time=${timeDuration}&problemCode=${problemCode}`
          );

          if (!fixResponse.ok) {
            alert('There was an error generating a better task.');
            return;
          }

          const suggestedTask = await fixResponse.json();

          // Ask the user to confirm the suggested task
          const userConfirmsTask = window.confirm(
            `Suggested Task: ${JSON.stringify(
              suggestedTask
            )}\nDo you want to add this task to your timetable?`
          );

          if (userConfirmsTask) {
            const newStuff = [];
            let time = startTime;
            for (const task of suggestedTask) {
              const temp = new Task(
                new Date(time * 1000).toDateString(),
                task.task,
                time,
                time + parseInt(task.time, 10)
              );
              time += parseInt(task.time, 10);
              newStuff.push(temp);
            }
            setTasks([...tasks, ...newStuff]);

            // Clear the form
            setNewTask('');
            // setStartTime('');
            // setEndTime('');
          }
        } else {
          // If task is suitable, add it to the timetable
          const formattedDate = date.toDateString();
          const task = new Task(formattedDate, newTask, startTime, endTime);
          setTasks([...tasks, task]);

          // Clear the form
          setNewTask('');
          // setStartTime('');
          // setEndTime('');
        }
      } else {
        // If task is suitable, add it to the timetable
        const formattedDate = date.toDateString();
        const task = new Task(formattedDate, newTask, startTime, endTime);
        setTasks([...tasks, task]);

        // Clear the form
        setNewTask('');
        // setStartTime('');
        // setEndTime('');
      }
    } catch (error) {
      console.error('Error adding task:', error);
      alert('An unexpected error occurred.');
    }
  };

  const delTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const changeTime = (e, type) => {
    const [hours, minutes] = e.target.value.split(':').map(Number);

    // Get today's date
    const now = new Date();
    now.setHours(hours, minutes, 0, 0); // Set hours, minutes, and reset seconds and milliseconds

    // Set as timestamp
    if (type == 'start') {
      setStartTimeVar(e.target.value);
      setStartTime(Math.floor(now.getTime() / 1000));
    } else {
      setEndTimeVar(e.target.value);
      setEndTime(Math.floor(now.getTime() / 1000));
    }
  };

  function formatTime(seconds) {
    const date = new Date(seconds * 1000); // Convert seconds to milliseconds
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12; // Convert to 12-hour format and handle midnight (0)
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${hours}:${formattedMinutes} ${ampm}`;
  }

  const todayTaskList = getTodayTasks(date, tasks);
  const todayTasks =
    todayTaskList.length > 0 ? (
      todayTaskList.map((task) => (
        <div
          key={task.id}
          className="flex justify-between items-center w-full md:text-lg lg:text-xl ml-2 my-1 rounded-lg p-2 bg-[#9AEDF2]"
        >
          <div className={task.status ? 'line-through' : ''}>
            {task.taskDescription}{' '}
            {task.startTime && task.endTime
              ? `(${formatTime(task.startTime)} - ${formatTime(task.endTime)})`
              : ''}
          </div>
          <img
            src={trashBin}
            className="inline-block w-7 h-7 cursor-pointer"
            onClick={() => delTask(task.id)}
            alt="Delete"
          />
        </div>
      ))
    ) : (
      <div className="inline-block w-full md:text-lg lg:text-xl ml-2 my-1 rounded-lg p-2">
        No tasks for today!
      </div>
    );

  const futureTaskList = getFutureTasks(date, tasks);
  const futureTasks =
    futureTaskList.length > 0 ? (
      futureTaskList.map((task) => (
        <div
          key={task.id}
          className="inline-block w-full md:text-lg lg:text-xl ml-2 my-1 rounded-lg p-2 bg-[#9AEDF2]"
        >
          {task.taskDescription}
        </div>
      ))
    ) : (
      <div className="inline-block w-full md:text-lg lg:text-xl ml-2 my-1 rounded-lg p-2">
        No upcoming tasks!
      </div>
    );

  return (
    <>
      <div className="flex w-full">
        <div className="flex items-center ml-auto p-5">
          <div className="text-8xl text-white">
            {date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}
          </div>
          <div className="flex flex-col h-full justify-end text-4xl px-2 py-1 text-white tracking-wider font-semibold">
            <div className="uppercase">
              {date.toLocaleString('default', { month: 'long' })}
            </div>
            <div>{date.toLocaleString('default', { year: 'numeric' })}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row md:flex-col">
        <div className="px-5 w-full">
          <div className="md:text-2xl lg:text-3xl font-semibold my-5">
            TODAY'S DEADLINES
          </div>
          {todayTasks}
        </div>

        <div className="px-5 w-full mb-5">
          <div className="md:text-2xl lg:text-3xl font-semibold my-5">
            UPCOMING DEADLINES
          </div>
          {futureTasks}
        </div>
      </div>

      <div className="mx-auto mt-auto w-11/12 mb-3">
        <div className="flex mx-auto justify-center items-center">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="border border-gray-300 rounded p-2 w-2/3"
            placeholder="Enter a new task"
          />
          <input
            type="time"
            value={startTimeVar}
            onChange={(e) => changeTime(e, 'start')}
            className="border border-gray-300 rounded p-2 ml-2 w-1/3"
            placeholder="Start time"
          />
          <input
            type="time"
            value={endTimeVar}
            onChange={(e) => changeTime(e, 'end')}
            className="border border-gray-300 rounded p-2 ml-2 w-1/3"
            placeholder="End time"
          />
          <button
            onClick={addNewTask}
            className="bg-blue-500 text-white rounded p-2 px-5 ml-2 w-1/3"
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
}

export default Tasks;
