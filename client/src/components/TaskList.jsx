import React from 'react';
import { format, isPast, isToday } from 'date-fns';

const TaskList = ({ tasks, onUpdateStatus }) => {
  
  const isOverdue = (task) => {
    return task.status === 'Pending' && (isPast(new Date(task.due_date)) && !isToday(new Date(task.due_date)));
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Compliance Tasks</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-50 border-b text-left text-xs font-semibold text-gray-600 uppercase">
              <th className="px-6 py-3">Task</th>
              <th className="px-6 py-3">Due Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tasks.map(task => (
              <tr key={task._id} className={isOverdue(task) ? 'bg-red-50' : ''}>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{task.title}</div>
                  <div className="text-xs text-gray-500">{task.category}</div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={isOverdue(task) ? 'text-red-600 font-bold' : 'text-gray-600'}>
                    {format(new Date(task.due_date), 'dd MMM yyyy')}
                    {isOverdue(task) && <span className="ml-2 text-[10px] bg-red-100 px-1 rounded">OVERDUE</span>}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    task.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {task.status === 'Pending' && (
                    <button 
                      onClick={() => onUpdateStatus(task._id, 'Completed')}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Mark Done
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {tasks.length === 0 && (
          <div className="p-10 text-center text-gray-400">No tasks found for this client.</div>
        )}
      </div>
    </div>
  );
};

export default TaskList;