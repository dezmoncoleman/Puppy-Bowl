import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PlayerList = ({ players, setPlayers }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/COHORT-NAME/players');
        const result = await response.json();
        if (result.success) {
          setPlayers(result.data.players);
        } else {
          setError(result.error.message);
        }
      } catch (err) {
        setError('Failed to fetch players.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [setPlayers]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Player List</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {players.map((player) => (
          <div key={player.id} className="border p-4 rounded shadow-md">
            <img src={player.imageUrl} alt={player.name} className="w-full h-48 object-cover mb-4" />
            <h3 className="text-lg font-bold">{player.name}</h3>
            <p>{player.breed}</p>
            <Link to={`/player/${player.id}`}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600 transition duration-300">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
