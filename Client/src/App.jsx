// import { useState } from 'react';
// // import Calendar from './components/Calendar.jsx';
// import DailySchedule from './components/DailyShedule.jsx';
// import Tasks from './components/Tasks.jsx';

// function App() {
//   const [taskList, setTaskList] = useState([
//     { id: 0, date: '2024-06-30', task: 'Do something' },
//     { id: 1, date: '2024-07-04', task: 'Finish personal project' },
//     { id: 2, date: '2024-06-02', task: 'Complete frontend challenge' },
//     { id: 3, date: '2024-06-02', task: 'Complete UI/UX challenge' },
//   ]);
//   const [selectedDate, setSelectedDate] = useState();
//   const [isScheduleVisible, setScheduleVisible] = useState(false);
//   const handleBackButtonClick = () => {
//     setScheduleVisible(false); // Hide the DailySchedule when back is clicked
//   };

//   return (
//     <>
//       {/* A container div for the whole site, having some global requirements like base font color */}
//       <div className="flex flex-col md:flex-row h-fit min-h-screen text-[#364043] bg-[#249EE3] ">
//         {/* The left section (Tasks section) */}
//         <div className="flex flex-col min-h-fit bg-[#36DBE5] w-full md:w-4/12">
//           <Tasks
//             date={selectedDate}
//             tasks={taskList}
//             setTasks={setTaskList}
//           ></Tasks>
//         </div>

//         {/* The right section  (Calendar section) */}
//         {/* <div className="w-full md:w-8/12 flex justify-center items-center h-fit md:min-h-screen">
//           <Calendar
//             tasks={taskList}
//             selectedDate={selectedDate}
//             setSelectedDate={setSelectedDate}
//           ></Calendar>
//         </div> */}

//         <div className="w-full md:w-8/12 flex justify-center items-center h-fit md:min-h-screen">
//         <DailySchedule
//           date={selectedDate} // Pass the selected date as a prop
//           onBack={handleBackButtonClick} // Pass the back button handler as a prop
//         />        </div>
//       </div>
//     </>
//   );
// }

// export default App;
import { useState } from 'react';
import Calendar from './components/Calendar.jsx';
import DailySchedule from './components/DailyShedule.jsx';
import Tasks from './components/Tasks.jsx';

function App() {
  const [taskList, setTaskList] = useState([
    { id: 0, date: '2024-06-30', task: 'Do something' },
    { id: 1, date: '2024-07-04', task: 'Finish personal project' },
    { id: 2, date: '2024-06-02', task: 'Complete frontend challenge' },
    { id: 3, date: '2024-06-02', task: 'Complete UI/UX challenge' },
  ]);
  const [selectedDate, setSelectedDate] = useState('');
  const [isScheduleVisible, setScheduleVisible] = useState(false);
  const [todayTaskList, setTodayTaskList] = useState([]);
  // const [futureTaskList, setFutureTaskList] = useState([]);
  const handleBackButtonClick = () => {
    setScheduleVisible(false); // Hide the DailySchedule when back is clicked
  };

  // const handleDateSelect = () => {
  //   setScheduleVisible(true); // Show DailySchedule when a date is selected
  // };

  return (
    <>
      <div className="flex flex-col md:flex-row h-fit min-h-screen text-[#364043] bg-[#249EE3]">
        <div className="flex flex-col min-h-fit bg-[#36DBE5] w-full md:w-4/12">
          <Tasks
            date={selectedDate}
            tasks={taskList}
            setTasks={setTaskList}
            setTodayTaskList={setTodayTaskList}

            // onDateSelect={handleDateSelect} // Pass this prop to Tasks for date selection
          />
        </div>

        <div className="w-full md:w-8/12 flex justify-center items-center h-fit md:min-h-screen">
          {isScheduleVisible ? (
            <DailySchedule
            todayTaskList={todayTaskList}
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
