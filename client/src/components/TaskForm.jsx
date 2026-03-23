import React, { useState } from 'react';
import axios from 'axios';
import API from '../api';

const TaskForm = ({ clientId, onTaskAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'GST',
    due_date: '',
    priority: 'Medium'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/tasks', { ...formData, client_id: clientId });
      onTaskAdded(response.data);
      setFormData({ title: '', category: 'GST', due_date: '', priority: 'Medium' });
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
      <h3 className="font-bold text-gray-700 mb-4">Add New Compliance Task</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input 
          type="text" placeholder="Task Title (e.g. GST Filing)" required
          className="border p-2 rounded text-sm"
          value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
        />
        <select 
          className="border p-2 rounded text-sm"
          value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
        >
          <option>GST</option>
          <option>Income Tax</option>
          <option>Audit</option>
          <option>ROC Filing</option>
        </select>
        <input 
          type="date" required
          className="border p-2 rounded text-sm"
          value={formData.due_date} onChange={e => setFormData({...formData, due_date: e.target.value})}
        />
        <button type="submit" className="bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition">
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;