import React, { useState } from "react";
import Task from "../Objects/Task";
import trashBin from "/trashbin.svg";

const getTodayTasks = (date, tasks) => {
  return tasks.filter((task) => new Date(task.date).toDateString() === date.toDateString());
};

const getFutureTasks = (date, tasks) => {
  return tasks.filter((task) => new Date(task.date).getTime() > date.getTime() + 43200000);
};

function Tasks({ date, tasks, setTasks}) {
  const [newTask, setNewTask] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  if (!date) {
    date = new Date(); // Set date to current date if no date is selected
  }



  const addNewTask = () => {
    if (!newTask) {
      alert("Please enter a task description.");
      return;
    }
    if (!startTime || !endTime) {
      alert("Please enter both start and end times.");
      return;
    }
    if (startTime >= endTime) {
      alert("End time must be after start time.");
      return;
    }

    const formattedDate = date.toDateString();
    const task = new Task(formattedDate, newTask, startTime, endTime);
    setTasks([...tasks, task]);

    setNewTask("");
    setStartTime("");
    setEndTime("");
  };

  const delTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const todayTaskList = getTodayTasks(date, tasks);
  const todayTasks = todayTaskList.length > 0 ? (
    todayTaskList.map((task) => (
      <div
        key={task.id}
        className="flex justify-between items-center w-full md:text-lg lg:text-xl ml-2 my-1 rounded-lg p-2 bg-[#9AEDF2]"
      >
        <div>
          {task.taskDescription} {task.startTime && task.endTime ? `(${task.startTime} - ${task.endTime})` : ""}
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
  const futureTasks = futureTaskList.length > 0 ? (
    futureTaskList.map((task) => (
      <div
        key={task.id}
        className="inline-block w-full md:text-lg lg:text-xl ml-2 my-1 rounded-lg p-2 bg-[#9AEDF2]"
      >
        {task.taskDescription} {task.startTime ? `from ${task.startTime}` : ""} {task.endTime ? `to ${task.endTime}` : ""}
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
            {date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}
          </div>
          <div className="flex flex-col h-full justify-end text-4xl px-2 py-1 text-white tracking-wider font-semibold">
            <div className="uppercase">
              {date.toLocaleString("default", { month: "long" })}
            </div>
            <div>{date.toLocaleString("default", { year: "numeric" })}</div>
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
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border border-gray-300 rounded p-2 ml-2 w-1/3"
            placeholder="Start time"
          />
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
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
