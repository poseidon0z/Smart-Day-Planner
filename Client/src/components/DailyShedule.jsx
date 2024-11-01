import React, { useEffect, useState } from 'react';

const DailySchedule = ({ date, onBack,taskList }) => { 
  const [tasks, setTasks] = useState([]);
  const getTodayTasks = (date, tasks) => {
    return tasks.filter((task) => new Date(task.date).toDateString() === date.toDateString());
  };
  useEffect(() => {
    const fetchTasks = () => {
      setTasks(getTodayTasks(date, taskList));
    };
    fetchTasks();
  }, [date, taskList]);

  const handleCheckboxChange = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], complete: !tasks[index].complete };
    setTasks(updatedTasks);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-end mb-4">
        <button 
          onClick={onBack} // Call onBack function when button is clicked
          className="bg-blue-500 text-white rounded px-4 py-2"
        >
          Back
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-4">Daily Schedule for {date.toDateString()}</h2>
      <div className="flex items-center mb-4 p-2 border border-gray-300 rounded-lg bg-gray-100">
        <label htmlFor="date-input" className="mr-2 font-semibold">
          Date:
        </label>
        <input
          type="date"
          id="date-input"
          value={new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0]} // Format date for input
          readOnly
          className="p-2 border border-gray-300 rounded"
        />
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
              className={`grid grid-cols-4 border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
              key={index}
            >
              <div className="p-3">
                <div className="text-center">{task.taskDescription}</div>
              </div>
              <div className="p-3 text-center">
                <div>{task.startTime}</div>
              </div>
              <div className="p-3 text-center">
                <div>{task.endTime}</div>
              </div>
              <div className="p-3 text-center">
                <input
                  type="checkbox"
                  checked={task.complete}
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
