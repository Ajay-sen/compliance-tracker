import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClientList from './components/ClientList';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [tasks, setTasks] = useState([]);

  // 1. Fetch all clients from the database on initial load
  useEffect(() => {
    axios.get('/api/clients')
      .then(res => setClients(res.data))
      .catch(err => console.error("Error fetching clients:", err));
  }, []);

  // 2. Fetch tasks for the specific client whenever 'selectedClient' changes
  useEffect(() => {
    if (selectedClient) {
      axios.get(`/api/tasks/${selectedClient._id}`)
        .then(res => setTasks(res.data))
        .catch(err => console.error("Error fetching tasks:", err));
    }
  }, [selectedClient]);

  // 3. Logic to update state when a new client is added from the sidebar
  const handleClientAdded = (newClient) => {
    setClients(prev => [...prev, newClient]);
    setSelectedClient(newClient); // Automatically focus on the new client
  };

  // 4. Logic to update task status (Pending -> Completed)
  const handleUpdateStatus = (taskId, newStatus) => {
    axios.patch(`/api/tasks/${taskId}`, { status: newStatus })
      .then(res => {
        setTasks(prev => prev.map(t => t._id === taskId ? res.data : t));
      })
      .catch(err => console.error("Error updating status:", err));
  };

  // 5. Logic to add a new task to the current view
  const handleTaskAdded = (newTask) => {
    setTasks(prev => [...prev, newTask]);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar: Pass the clients and the addition handler */}
      <ClientList 
        clients={clients} 
        selectedClient={selectedClient} 
        onSelectClient={setSelectedClient} 
        onClientAdded={handleClientAdded}
      />

      {/* Main Dashboard Area */}
      <main className="flex-1 p-10 overflow-y-auto">
        {selectedClient ? (
          <div className="max-w-4xl mx-auto">
            <header className="mb-8 border-b border-gray-200 pb-6">
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                {selectedClient.company_name}
              </h1>
              <div className="flex gap-3 mt-3">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {selectedClient.entity_type}
                </span>
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {selectedClient.country}
                </span>
              </div>
            </header>

            {/* Form to add new compliance tasks */}
            <TaskForm 
              clientId={selectedClient._id} 
              onTaskAdded={handleTaskAdded} 
            />

            {/* Table/List of compliance tasks */}
            <TaskList 
              tasks={tasks} 
              onUpdateStatus={handleUpdateStatus} 
            />
          </div>
        ) : (
          /* Landing State (shown when no client is selected) */
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center p-12 bg-white rounded-3xl shadow-xl border border-gray-100 max-w-sm">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 0h6" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
              <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                Select a client from the sidebar to view their tax filings and compliance status.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;