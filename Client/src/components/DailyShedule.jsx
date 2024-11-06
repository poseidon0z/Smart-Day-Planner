import React, { useEffect, useState } from 'react';
import Task from '../Objects/Task'; // Import the Task class

const DailySchedule = ({
  date,
  onBack,
  taskList,
  setLoading,
  newTasks,
  refresh,
}) => {
  const [tasks, setTasks] = useState([]);

  // Convert tasks in taskList to Task instances if they aren't already
  const initializeTasks = (taskList) => {
    return taskList.map((task) =>
      task instanceof Task
        ? task
        : new Task(
            task.date,
            task.taskDescription,
            task.startTime,
            task.endTime,
            task.status
          )
    );
  };

  // Filter tasks for the selected date
  const getTodayTasks = (date, tasks) => {
    return tasks.filter(
      (task) => new Date(task.date).toDateString() === date.toDateString()
    );
  };

  useEffect(() => {
    const fetchTasks = () => {
      setTasks(() => getTodayTasks(date, initializeTasks(taskList)));
    };
    fetchTasks();
  }, [date, taskList]);

  const handleCheckboxChange = (index) => {
    setLoading(true);
    const updatedTasks = [...tasks];
    const task = updatedTasks[index];

    // Use the Task methods to update completion status
    if (task.status) {
      task.incompleteTask();
    } else {
      task.completeTask();
    }

    // Update the tasks state
    setTasks(updatedTasks);
    refresh();
    setLoading(false);
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

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-end mb-4">
        <button
          onClick={onBack}
          className="bg-blue-500 text-white rounded px-4 py-2"
        >
          Back
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-4">
        Daily Schedule for {date.toDateString()}
      </h2>
      <div className="flex justify-between items-center mb-4 p-2 border border-gray-300 rounded-lg bg-gray-100">
        <div>
          <label htmlFor="date-input" className="mr-2 font-semibold">
            Date:
          </label>
          <input
            type="date"
            id="date-input"
            value={
              new Date(date.getTime() - date.getTimezoneOffset() * 60000)
                .toISOString()
                .split('T')[0]
            }
            readOnly
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          className="bg-blue-500 text-white rounded px-4 py-2"
          onClick={newTasks}
        >
          Smart update schedule!
        </button>
      </div>
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="grid grid-cols-4 bg-blue-600 text-white text-center">
          <div className="p-3">Task</div>
          <div className="p-3">Start Time</div>
          <div className="p-3">End Time</div>
          <div className="p-3">Complete</div>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {tasks.map((task, index) => (
            <div
              className={`grid grid-cols-4 border-b ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
              }`}
              key={task.id}
            >
              <div className="p-3 text-center">{task.taskDescription}</div>
              <div className="p-3 text-center">
                {formatTime(task.startTime)}
              </div>
              <div className="p-3 text-center">{formatTime(task.endTime)}</div>
              <div className="p-3 text-center">
                <input
                  type="checkbox"
                  checked={task.status}
                  onChange={() => handleCheckboxChange(index)}
                  className="h-5 w-5"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailySchedule;
