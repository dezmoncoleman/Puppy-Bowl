import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PlayerDetails = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2401-FTB-ET-WEB-PT/players/${id}`);
        const result = await response.json();
        if (result.success) {
          setPlayer(result.data.player);
        } else {
          setError(result.error.message);
        }
      } catch (err) {
        setError('Failed to fetch player details.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [id]);

  const handleDelete = async () => {
    const confirmDeletion = window.confirm('Please do not delete dogs with pictures. Are you sure?');
    if (confirmDeletion) {
      try {
        const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2401-FTB-ET-WEB-PT/players/${id}`, {
          method: 'DELETE',
        });
        const result = await response.json();
        if (result.success) {
          alert('Player deleted successfully.');
          navigate('/');
        } else {
          alert('Failed to delete player.');
        }
      } catch (err) {
        alert('Error deleting player.');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Player Details</h2>
      {player && (
        <div className="space-y-4">
          <div>
            <img src={player.imageUrl} alt={player.name} className="w-48 h-48 object-cover" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <p>{player.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Breed</label>
            <p>{player.breed}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <p>{player.status}</p>
          </div>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
          >
            Delete Player
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayerDetails;
