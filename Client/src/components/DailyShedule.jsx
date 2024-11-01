import React, { useState } from 'react';

const hours = [
  '5:00 AM',
  '6:00 AM',
  '7:00 AM',
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
  '7:00 PM',
  '8:00 PM',
  '9:00 PM',
  '10:00 PM',
];

const DailySchedule = ({ date }) => {
  const [tasks, setTasks] = useState(
    Array(hours.length).fill({
      task: '',
      startTime: '',
      endTime: '',
      complete: false,
    })
  );

  const handleInputChange = (index, field, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], [field]: value };
    setTasks(updatedTasks);
  };

  const handleCheckboxChange = (index) => {
    handleInputChange(index, 'complete', !tasks[index].complete);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Daily Schedule for {date}</h2>
      <div className="flex items-center mb-4 p-2 border border-gray-300 rounded-lg bg-gray-100">
        <label htmlFor="date-input" className="mr-2 font-semibold">
          Date:
        </label>
        <input
          type="date"
          id="date-input"
          value={date}
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
          {tasks.map((_, index) => (
            <div
              className={`grid grid-cols-4 border-b ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
              }`}
              key={index}
            >
              <div className="p-3">
                <input
                  type="text"
                  placeholder="Task"
                  value={tasks[index].task}
                  onChange={(e) =>
                    handleInputChange(index, 'task', e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="p-3">
                <select
                  value={tasks[index].startTime}
                  onChange={(e) =>
                    handleInputChange(index, 'startTime', e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Start Time</option>
                  {hours.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
              </div>
              <div className="p-3">
                <select
                  value={tasks[index].endTime}
                  onChange={(e) =>
                    handleInputChange(index, 'endTime', e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select End Time</option>
                  {hours.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
              </div>
              <div className="p-3 text-center">
                <input
                  type="checkbox"
                  checked={tasks[index].complete}
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
