import React from 'react';
import AddClientForm from './AddClientForm';

const ClientList = ({ clients, selectedClient, onSelectClient, onClientAdded }) => {
  return (
    <div className="w-72 bg-gray-50 h-screen p-6 border-r flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 tracking-tight">Clients</h2>
      <AddClientForm onClientAdded={onClientAdded} />
      <div className="flex-1 overflow-y-auto space-y-3">
        {clients.map(client => (
          <div 
            key={client._id}
            onClick={() => onSelectClient(client)}
            className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
              selectedClient?._id === client._id 
                ? 'bg-blue-600 border-blue-600 text-white shadow-md transform scale-[1.02]' 
                : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 shadow-sm'
            }`}
          >
            <p className="font-bold text-sm truncate">{client.company_name}</p>
            <p className={`text-xs mt-1 ${selectedClient?._id === client._id ? 'text-blue-100' : 'text-gray-500'}`}>
              {client.entity_type} • {client.country}
            </p>
          </div>
        ))}
        {clients.length === 0 && (
          <p className="text-gray-400 text-sm text-center mt-10 italic">No clients found...</p>
        )}
      </div>
    </div>
  );
};

export default ClientList;