import React, { useState, useEffect } from 'react';

// Gets the number of days in a month
const getDaysInMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month + 1, 0).getDate(); // 0 makes the date underflow, hence generating the last day of the month we need
};

// Gets the day on which the first date of the month occurs
const getFirstDayOfMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return (new Date(year, month, 1).getDay() + 6) % 7;
};

// Get the date at the start of the month of the provided date
const startOfMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month, 1);
};

// Get tasks scheduled for a particular date from the task list
const getTodayTasks = (date, tasks) => {
  let todayTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    if (new Date(tasks[i].date).toDateString() === date.toDateString()) {
      todayTasks.push(tasks[i].task);
    }
  }
  return todayTasks;
};

// Calendar component
const Calendar = ({ tasks, selectedDate, setSelectedDate }) => {
  const currentDate = new Date();
  const [displayDate, setDisplayDate] = useState(startOfMonth(currentDate));

  // Change month by a certain amount
  const changeMonth = (amount) => {
    setDisplayDate(
      new Date(displayDate.getFullYear(), displayDate.getMonth() + amount, 1)
    );
  };

  // Add special css effects to a date when required
  const specialColours = (date) => {
    // In current date and month
    if (
      date === currentDate.getDate() &&
      displayDate.toDateString() == startOfMonth(currentDate).toDateString()
    ) {
      return 'border-2 font-semibold border-yellow-500 bg-yellow-200';
    }
    // In selected date
    if (
      selectedDate &&
      date === selectedDate.getDate() &&
      displayDate.toDateString() == startOfMonth(selectedDate).toDateString()
    ) {
      return 'bg-[#5ED3EC]';
    }

    // If there are any tasks scheduled for today
    if (
      getTodayTasks(
        new Date(displayDate.getFullYear(), displayDate.getMonth(), date),
        tasks
      ).length != 0
    ) {
      return 'bg-[#F77600]';
    }

    // In current date, but different month
    if (date === currentDate.getDate()) {
      return 'border-2 font-semibold border-yellow-500';
    }
  };

  // Handle clicking on a date
  const handleDateClick = (date) => {
    setSelectedDate(
      new Date(displayDate.getFullYear(), displayDate.getMonth(), date)
    );
  };

  // Getting details for Month name and Year to display on top of calendar
  const monthYear = displayDate.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  // Array to hold all days which are to be added to the calendar
  const calendarDays = [];

  // Add previous month's dates
  const firstDisplayDay = getFirstDayOfMonth(displayDate);
  const prevMonth = new Date(
    displayDate.getMonth() === 0 ? 11 : displayDate.getMonth() - 1,
    displayDate.getMonth() === 0
      ? displayDate.getFullYear() - 1
      : displayDate.getFullYear()
  );
  const prevMonthDays = getDaysInMonth(prevMonth);
  for (let i = firstDisplayDay - 1; i >= 0; i--) {
    calendarDays.push(
      <div
        className="border border-[#D5D4DF] bg-[#F2F3F7] w-full aspect-square h-full flex justify-center items-center rounded-full text-[#A8A8A8]"
        key={`prev-${i}`}
      >
        {prevMonthDays - i}
      </div>
    );
  }

  // Add current month's dates
  const daysInCurrentMonth = getDaysInMonth(displayDate);
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    calendarDays.push(
      <div
        onClick={() => handleDateClick(i)}
        className={
          'border border-border-[#D5D4DF] w-full aspect-square h-full flex justify-center items-center rounded-full cursor-pointer transition-colors duration-300 hover:bg-gray-200 ' +
          specialColours(i)
        }
        key={i}
      >
        {i}
      </div>
    );
  }

  // Add next month's dates
  for (let i = 1; calendarDays.length % 7 != 0; i++) {
    calendarDays.push(
      <div
        className="border border-[#D5D4DF] bg-[#F2F3F7] w-full aspect-square h-full flex justify-center items-center rounded-full text-[#A8A8A8]"
        key={`next-${i}`}
      >
        {i}
      </div>
    );
  }

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-lg w-fit h-fit my-5 w-full sm:w-5/6 lg:w-4/6 xl:w-7/12">
        {/* Heading section */}
        <div className="flex w-full justify-between items-center mb-6">
          <div className="text-4xl font-black">{monthYear}</div>
          <div className="w-20 flex justify-between">
            <button
              className="text-3xl mr-auto"
              onClick={() => changeMonth(-1)}
            >
              &lt;
            </button>
            <button
              className="text-3xl ml-auto"
              onClick={() => changeMonth(+1)}
            >
              &gt;
            </button>
          </div>
        </div>

        {/* Calendar display */}
        <div className="flex flex-col justify-center w-full aspect-square">
          <div className="grid grid-cols-7 gap-0">
            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
              <div
                key={day}
                className="text-xl w-full aspect-square flex justify-center items-center font-bold"
              >
                {day}
              </div>
            ))}
            {calendarDays}
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
