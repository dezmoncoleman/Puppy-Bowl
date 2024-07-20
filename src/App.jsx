import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PlayerList from './components/PlayerList';
import PlayerDetails from './components/PlayerDetails';
import CreatePlayer from './components/CreatePlayer';

const App = () => {
  const [players, setPlayers] = useState([]);

  return (
    <Router>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search players..."
            className="custom-input"
          />
          <Link to="/create">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
              Create Player
            </button>
          </Link>
        </div>
        <Routes>
          <Route path="/player/:id" element={<PlayerDetails />} />
          <Route path="/" element={<PlayerList players={players} setPlayers={setPlayers} />} />
          <Route path="/create" element={<CreatePlayer setPlayers={setPlayers} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
