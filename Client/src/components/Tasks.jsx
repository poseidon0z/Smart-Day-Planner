import React, { useState } from 'react';

// Trashbin image from public
import trashBin from '../../public/trashbin.svg';

// Getting tasks scheduled for a particular date
const getTodayTasks = (date, tasks) => {
  let todayTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    if (new Date(tasks[i].date).toDateString() === date.toDateString()) {
      todayTasks.push(tasks[i]);
    }
  }
  return todayTasks;
};

// Getting tasks scheduled for a future date
const getFutureTasks = (date, tasks, setTasks) => {
  let futureTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    if (new Date(tasks[i].date).getTime() > date.getTime() + 43200000) {
      futureTasks.push(tasks[i].task);
    }
  }
  return futureTasks;
};

// Tasks component
function Tasks({ date, tasks, setTasks }) {
  const [newTask, setNewTask] = useState();

  if (!date) {
    date = new Date(); // Sets the date to current date if no date is selected
  }

  // Adding new task to task list
  const addNewTask = () => {
    setTasks([
      ...tasks,
      { date: date.toDateString(), task: newTask, id: tasks.length + 1 },
    ]);
  };

  // Deleting a task from the task list using it's id
  const delTask = (id) => {
    const temp = [];
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id != id) {
        temp.push(tasks[i]);
      }
    }
    setTasks(temp);
  };

  // Filling divs containing tasks for the selected day into an array
  const todayTaskList = getTodayTasks(date, tasks);
  const todayTasks = [];
  for (let i = 0; i < todayTaskList.length; i++) {
    todayTasks.push(
      <div className="flex justify-between items-center w-full md:text-lg lg:text-xl ml-2 my-1 rounded-lg p-2 bg-[#9AEDF2]">
        {todayTaskList[i].task}
        <img
          src={trashBin}
          className="inline-block w-7 h-7"
          onClick={() => delTask(todayTaskList[i].id)}
        ></img>
      </div>
    );
  }
  if (todayTaskList.length == 0) {
    todayTasks.push(
      <div className="inline-block w-full md:text-lg lg:text-xl ml-2 my-1 rounded-lg p-2">
        No tasks for today!
      </div>
    );
  }

  // Filling divs containing future tasks into an array
  const futureTaskList = getFutureTasks(date, tasks);
  const futureTasks = [];
  for (let i = 0; i < futureTaskList.length; i++) {
    futureTasks.push(
      <div className="inline-block w-full md:text-lg lg:text-xl ml-2 my-1 rounded-lg p-2 bg-[#9AEDF2]">
        {futureTaskList[i]}
      </div>
    );
  }
  if (futureTaskList.length == 0) {
    futureTasks.push(
      <div className="inline-block w-full md:text-lg lg:text-xl ml-2 my-1 rounded-lg p-2">
        No upcoming tasks!
      </div>
    );
  }

  return (
    <>
      {/* Date */}
      <div className="flex w-full">
        <div className="flex items-middle ml-auto p-5">
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

      {/* Tasks section */}
      <div className="flex flex-col sm:flex-row md:flex-col">
        {/* Today section */}
        <div className="px-5 w-full">
          <div className="md:text-2xl lg:text-3xl font-semibold my-5">
            TODAY'S DEADLINES
          </div>
          {todayTasks}
        </div>

        {/* Upcoming section */}
        <div className="px-5 w-full mb-5">
          <div className="md:text-2xl lg:text-3xl font-semibold my-5">
            UPCOMING DEADLINES
          </div>
          {futureTasks}
        </div>
      </div>

      {/* New task */}
      <div className="mx-auto mt-auto w-11/12 mb-3">
        <div className="flex mx-auto justify-center items-center">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="border border-gray-300 rounded p-2 w-2/3"
            placeholder="Enter a new task"
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
