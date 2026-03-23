import React, { useState } from 'react';
import axios from 'axios';

const AddClientForm = ({ onClientAdded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('India');
  const [type, setType] = useState('Private Ltd');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/clients', {
        company_name: name,
        country: country,
        entity_type: type
      });
      onClientAdded(res.data);
      setName('');
      setIsOpen(false);
    } catch (err) {
      console.error("Error adding client", err);
    }
  };

  if (!isOpen) return (
    <button 
      onClick={() => setIsOpen(true)}
      className="w-full mb-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-all text-sm font-bold"
    >
      + Add New Client
    </button>
  );

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-3 bg-white border rounded-lg shadow-sm space-y-2">
      <input 
        className="w-full border p-1 text-xs rounded"
        placeholder="Company Name"
        value={name} onChange={e => setName(e.target.value)}
        required
      />
      <div className="flex gap-2">
        <input 
          className="w-1/2 border p-1 text-xs rounded"
          placeholder="Country"
          value={country} onChange={e => setCountry(e.target.value)}
        />
        <select 
          className="w-1/2 border p-1 text-xs rounded"
          value={type} onChange={e => setType(e.target.value)}
        >
          <option>Private Ltd</option>
          <option>LLP</option>
          <option>Individual</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button type="submit" className="flex-1 bg-blue-600 text-white text-[10px] py-1 rounded">Save</button>
        <button onClick={() => setIsOpen(false)} className="flex-1 bg-gray-200 text-gray-600 text-[10px] py-1 rounded">Cancel</button>
      </div>
    </form>
  );
};

export default AddClientForm;