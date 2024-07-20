import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePlayer = ({ setPlayers }) => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [status, setStatus] = useState('bench');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/COHORT-NAME/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          breed,
          status,
          imageUrl,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setName('');
        setBreed('');
        setStatus('bench');
        setImageUrl('');
        alert('Player created successfully');
        setPlayers((prevPlayers) => [...prevPlayers, result.data.newPlayer]);
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      alert('Error creating player');
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Player</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Breed</label>
          <input
            type="text"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded"
            required
          >
            <option value="bench">Bench</option>
            <option value="field">Field</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Create Player
        </button>
      </form>
    </div>
  );
};

export default CreatePlayer;
