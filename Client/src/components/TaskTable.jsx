import React from 'react';

const TaskTable = ({ tasks }) => {
  return (
    <div className="border-2 border-gray-600 rounded-lg overflow-hidden">
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-blue-500">
            <th className="border-r border-b border-white px-4 py-2 text-white">
              Task
            </th>
            <th className="border-l border-b border-white px-4 py-2 text-white">
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((item, index) => {
            // Inline time conversion
            const hours = Math.floor(item.time / 3600);
            const minutes = Math.floor((item.time % 3600) / 60);
            const seconds = item.time % 60;
            const formattedTime = [
              hours > 0 ? `${hours}h` : '',
              minutes > 0 ? `${minutes}m` : '',
              seconds > 0 ? `${seconds}s` : '',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <tr key={index}>
                <td className="border-r border-b border-gray-300 px-4 py-2">
                  {item.task}
                </td>
                <td className="border-b border-gray-300 px-4 py-2 text-center">
                  {formattedTime}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
