import { useState } from 'react';
import Calendar from './components/Calendar.jsx';
import DailySchedule from './components/DailyShedule.jsx';
import Tasks from './components/Tasks.jsx';

function App() {
  const [taskList, setTaskList] = useState([
  
  ]);
  const [selectedDate, setSelectedDate] = useState('');
  const [isScheduleVisible, setScheduleVisible] = useState(false);
  const handleBackButtonClick = () => {
    setScheduleVisible(false); // Hide the DailySchedule when back is clicked
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
          {isScheduleVisible ? (
            <DailySchedule
            taskList={taskList}
              date={selectedDate} // Pass the selected date as a prop
              onBack={handleBackButtonClick} // Pass the back button handler as a prop
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
