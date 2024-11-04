import { useState } from 'react';
import Calendar from './components/Calendar.jsx';
import DailySchedule from './components/DailyShedule.jsx';
import Tasks from './components/Tasks.jsx';
import Task from './Objects/Task.js';

function App() {
  const baseURL = 'http://localhost:3000';

  const [taskList, setTaskList] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [isScheduleVisible, setScheduleVisible] = useState(false);
  const [refresher, setRefresher] = useState(false);
  const handleBackButtonClick = () => {
    setScheduleVisible(false); // Hide the DailySchedule when back is clicked
  };

  const refresh = () => {
    setRefresher(!refresher);
  };

  const newTasks = async () => {
    try {
      // Map tasklist to the format required by the endpoint
      const currentTasks = taskList.map((task) => ({
        task: task.taskDescription,
        start: task.startTime,
        end: task.endTime,
        completed: task.status,
        completedTime: task.status ? task.completionTime : null,
      }));

      // Send currentTasks to the endpoint
      const response = await fetch(`${baseURL}/AI/reorganise-task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentTasks }),
      });

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      // Parse the response
      const result = await response.json();
      console.log(result);

      // Update tasklist with the new data
      const newTasks = result.currentTasks.map((taskData, index) => {
        let task = new Task(
          new Date(taskData.start * 1000).toDateString(),
          taskData.task,
          taskData.start,
          taskData.end,
          taskData.completed
        );
        task.completionTime = taskData.completedTime;

        return task;
      });
      setTaskList(newTasks);
      console.log('Tasklist updated:', taskList);
    } catch (error) {
      console.error('Failed to update tasklist:', error);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row h-fit min-h-screen text-[#364043] bg-[#249EE3]">
        <div className="flex flex-col min-h-fit bg-[#36DBE5] w-full md:w-4/12">
          <Tasks
            date={selectedDate}
            tasks={taskList}
            setTasks={setTaskList}

            // onDateSelect={handleDateSelect} // Pass this prop to Tasks for date selection
          />
        </div>

        <div className="w-full md:w-8/12 flex justify-center items-center h-fit md:min-h-screen">
          {isScheduleVisible &&
          new Date(selectedDate).toDateString() ===
            new Date().toDateString() ? (
            <DailySchedule
              taskList={taskList}
              date={selectedDate} // Pass the selected date as a prop
              onBack={handleBackButtonClick} // Pass the back button handler as a prop
              refresh={refresh}
              newTasks={newTasks}
            />
          ) : (
            <Calendar
              tasks={taskList}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              setScheduleVisible={setScheduleVisible}
              // Assuming Calendar has a similar handler
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
