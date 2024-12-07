import React from 'react';
import ReactDOM from 'react-dom/client';
import playerData from '../data/players.json';
import { PlayerTable } from './PlayerTable';

const App: React.FC = () => {

const filteredPlayers = Object.values(playerData)
  .filter(player => typeof player.search_rank === 'number' && !isNaN(player.search_rank) && player.search_rank <= 1000)
  .sort((a, b) => a.search_rank - b.search_rank) as Player[];
  
  filteredPlayers.forEach((player, index) => {
    player.rank = index + 1; 
  });
  
  return <PlayerTable data={filteredPlayers} />;

};

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(<App />);